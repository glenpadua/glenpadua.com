import { Badge } from 'components/ui/badge';

const Tag = ({ children, color = '#000' }) => (
  <Badge
    className="inline rounded-2xl px-2.5 py-1 text-[0.7em] font-light text-white"
    style={{ background: color }}
  >
    {children}
  </Badge>
);

export default Tag;
