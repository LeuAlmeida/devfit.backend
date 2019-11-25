import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function FormatDate(date) {
  return format(date, 'yyyy-MM-dd', { locale: pt });
}
