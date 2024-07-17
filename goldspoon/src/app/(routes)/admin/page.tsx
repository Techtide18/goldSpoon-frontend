import DashboardTitle from "@/components/cards/dashboardTitle";
import {
  Users,
  DollarSign,
  ShoppingCart,
  ArrowBigDownDashIcon,
  PersonStanding,
  Package,
} from "lucide-react";
import DashboardCard, {
  DashboardCardContent,
  DashboardCardProps,
} from "@/components/cards/dashboardCard";
import RecentSalesCard, {
  SalesProps,
} from "@/components/cards/recentSalesCard";

const cardData: DashboardCardProps[] = [
  {
    label: "Today's Members",
    amount: "33", // Example data
    description: "+20.1% from last month",
    icon: Users,
  },
  {
    label: "Total Members",
    amount: "6822", // Example data
    description: "+180.1% from last month",
    icon: Users,
  },
  {
    label: "Blocked Members",
    amount: "127", // Example data
    description: "+201 since last hour",
    icon: Users,
  },
  {
    label: "Active E-PINs",
    amount: "6971", // Example data
    description: "+20.1% from last month",
    icon: ShoppingCart,
  },
  {
    label: "Inactive E-PINs",
    amount: "260", // Example data
    description: "+180.1% from last month",
    icon: ShoppingCart,
  },
  {
    label: "Total E-PINs",
    amount: "7231", // Example data
    description: "+19% from last month",
    icon: ShoppingCart,
  },
  {
    label: "Total Level Income History",
    amount: "₹5,053,650", // Example data
    description: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Total Direct Income History",
    amount: "₹271,800", // Example data
    description: "+180.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Total Withdrawals Count",
    amount: "₹271,800", // Example data
    description: "+180.1% from last month",
    icon: ArrowBigDownDashIcon,
  },
  {
    label: "Total Withdrawals Ammont",
    amount: "₹271,800", // Example data
    description: "+180.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Total Packages",
    amount: "1", // Example data
    description: "Total 1 package",
    icon: Package,
  },
  {
    label: "Total Groups",
    amount: "60", // Example data
    description: "Total 60 groups present",
    icon: PersonStanding,
  },
];

const userSalesData: SalesProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+₹1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    saleAmount: "+₹1,999.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+₹39.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+₹299.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
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
          <p>Recent Sales</p>
          <p className="text-sm text-gray-400">
            You made 265 sales this month.
          </p>
        </section>
        {userSalesData.map((d, i) => (
          <RecentSalesCard
            key={i}
            email={d.email}
            name={d.name}
            saleAmount={d.saleAmount}
          />
        ))}
      </DashboardCardContent>
    </div>
  );
}
