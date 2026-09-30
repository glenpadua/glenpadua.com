import type { DeskArticle } from './content';

export const DESK_MEMORY_KEY = 'writing-desk-v1';
export const PAPERS_PER_SPREAD = 4;

export interface DeskMemory {
  page: number;
  firstUid: string | null;
  lastUid: string | null;
  lampOn: boolean;
  chronicles: boolean;
}

const emptyMemory: DeskMemory = {
  page: 0,
  firstUid: null,
  lastUid: null,
  lampOn: true,
  chronicles: false,
};

/** Validate optional browser storage against the current catalogue. Never trust
 * an old page number after an article is removed or the collection changes. */
export function restoreDesk(
  raw: string | null,
  articles: readonly DeskArticle[],
): DeskMemory {
  if (!raw) return { ...emptyMemory };
  try {
    const saved: unknown = JSON.parse(raw);
    if (
      !saved ||
      typeof saved !== 'object' ||
      !('version' in saved) ||
      saved.version !== 1
    )
      return { ...emptyMemory };
    const value = saved as Record<string, unknown>;
    const firstIndex = articles.findIndex(a => a.uid === value.firstUid);
    const maxPage = Math.max(
      0,
      Math.ceil(articles.length / PAPERS_PER_SPREAD) - 1,
    );
    const page =
      firstIndex >= 0
        ? Math.floor(firstIndex / PAPERS_PER_SPREAD)
        : typeof value.page === 'number' && Number.isInteger(value.page)
          ? Math.max(0, Math.min(value.page, maxPage))
          : 0;
    return {
      page,
      firstUid: articles[page * PAPERS_PER_SPREAD]?.uid ?? null,
      lastUid: articles.some(a => a.uid === value.lastUid)
        ? String(value.lastUid)
        : null,
      lampOn: typeof value.lampOn === 'boolean' ? value.lampOn : true,
      chronicles: value.chronicles === true && articles.some(a => a.chronicle),
    };
  } catch {
    return { ...emptyMemory };
  }
}

export function serializeDesk(memory: DeskMemory): string {
  return JSON.stringify({ version: 1, ...memory });
}
