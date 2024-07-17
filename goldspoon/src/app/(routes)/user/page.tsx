import DashboardTitle from "@/components/cards/dashboardTitle";
import {
  Users,
  DollarSign,
  ShoppingCart,
  ArrowBigDownDashIcon,
  PersonStanding,
  Package,
  ArrowBigDown,
  Package2,
  Fingerprint,
  Braces,
  CreditCard,
  PersonStandingIcon,
} from "lucide-react";
import DashboardCard, {
  DashboardCardContent,
  DashboardCardProps,
} from "@/components/cards/dashboardCard";
import RecentWithdrawalsCard, {
  WithdrawalsProps,
} from "@/components/cards/recentWithdrawalsCard";

const cardData: DashboardCardProps[] = [
  {
    label: "Epin Id",
    amount: "2342353534", // Example data
    description: "My current epin",
    icon: Fingerprint,
  },
  {
    label: "Current Group",
    amount: "G12", // Example data
    description: "My current group",
    icon: Users,
  },
  {
    label: "Token Number",
    amount: "67", // Example data
    description: "My token number in group",
    icon: Braces,
  },
  {
    label: "Current Package",
    amount: "Package - 1500", // Example data
    description: "My current package",
    icon: Package,
  },
  {
    label: "Total Renewal Income History",
    amount: "₹260", // Example data
    description: "Total renewal income generated",
    icon: DollarSign,
  },
  {
    label: "Total Level Income History",
    amount: "₹7,231", // Example data
    description: "Total level income generated",
    icon: DollarSign,
  },
  {
    label: "Total Wallet Balance",
    amount: "₹271,800", // Example data
    description: "Total balance in wallet",
    icon: DollarSign,
  },
  {
    label: "Approved Wallet Balance",
    amount: "₹171,800", // Example data
    description: "Total approved balance in wallet",
    icon: DollarSign,
  },
  {
    label: "My Status",
    amount: "Active", // Example data
    description: "My epin status",
    icon: PersonStanding,
  },
  {
    label: "Total Withdrawals Count",
    amount: "60", // Example data
    description: "Total 60 groups present",
    icon: CreditCard,
  },
  {
    label: "Total Withdrawals Ammount",
    amount: "₹32,430", // Example data
    description: "Total 60 groups present",
    icon: CreditCard,
  },
];

const userSalesData: WithdrawalsProps[] = [
  {
    epin: "4234234234",
    date: "27-04-24",
    saleAmount: "+₹1,999.00",
  },
  {
    epin: "4234234234",
    date: "27-09-24",
    saleAmount: "+₹1,999.00",
  },
  {
    epin: "4234234234",
    date: "27-11-24",
    saleAmount: "+₹39.00",
  },
  {
    epin: "4234234234",
    date: "27-03-24",
    saleAmount: "+₹299.00",
  },
  {
    epin: "4234234234",
    date: "27-03-24",
    saleAmount: "+₹39.00",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full px-4 mt-4">
      <DashboardTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <DashboardCard
            key={i}
            amount={d.amount}
            description={d.description}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <DashboardCardContent className="flex justify-between gap-4">
        <section>
          <p>Recent Withdrawals</p>
          <p className="text-sm text-gray-400">
            You made these withdrawals recently.
          </p>
        </section>
        {userSalesData.map((d, i) => (
          <RecentWithdrawalsCard
            key={i}
            date={d.date}
            epin={d.epin}
            saleAmount={d.saleAmount}
          />
        ))}
      </DashboardCardContent>
    </div>
  );
}
