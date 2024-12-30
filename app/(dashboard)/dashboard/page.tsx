import { FC } from 'react';

type TpageProps = {
  className?: string;
};

const Dashboard: FC<TpageProps> = ({ className }) => {
  return <div className={className}>Dashboard</div>;
};

export default Dashboard;
