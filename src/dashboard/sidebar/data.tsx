
import { HomeIcon } from './icons/HomeIcon';
import { StatusIcon } from './icons/StatusIcon';
import { CreditIcon } from './icons/CreditIcon';
import { TransactionIcon } from './icons/TransactionIcon';
import KycIcon from './icons/KycIcon';

export const data = [
  {title:'Login',
    link:'/'},
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    link: '/admin',
  },
  {
    title: 'Upload EOD File',
    icon: <StatusIcon />,
    link: '/admin/csv',
  },
  {
    title: 'Bank Transactions',
    icon: <TransactionIcon />,
    link: '/admin/transaction',
  },
  {
    title: 'Wallet Transactions',
    icon: <CreditIcon />,
    link: '/admin/wallet',
  },
  {
    title: 'Bank KYC',
    icon:  <KycIcon/>,
    link: '/admin/bankkyc',
  }
  
 
];
