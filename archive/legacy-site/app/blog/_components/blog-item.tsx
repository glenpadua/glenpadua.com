'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/app/components/ui/card';

interface BlogItemProps {
  uid: string;
  title: string;
  published: string;
  preview: string;
}

export function BlogItem({
  uid,
  title,
  published,
  preview,
}: BlogItemProps): JSX.Element {
  return (
    <Link
      href={`/blog/${uid}`}
      className="block w-full text-black no-underline"
    >
      <motion.div whileHover={{ x: 10 }}>
        <Card className="border-none bg-transparent shadow-none">
          <CardContent className="px-4 py-3">
            <h2 className="text-[1.4em] font-normal">{title}</h2>
            <time className="text-[0.8em] font-light">{published}</time>
            <p className="mt-2.5 text-base font-light leading-[1.4]">
              {preview}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
