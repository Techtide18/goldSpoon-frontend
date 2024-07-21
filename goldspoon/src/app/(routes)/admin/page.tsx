"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
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

const simulatedCardData: DashboardCardProps[] = [
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
    label: "Total Withdrawals Amount",
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
  const [cardData, setCardData] = useState<DashboardCardProps[]>(simulatedCardData);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/dashboard", {
          headers: {
            adminMemberId: 1,
          },
        });
        const data = response.data;

        const updatedCardData = simulatedCardData.map((simulatedCard) => {
          switch (simulatedCard.label) {
            case "Today's Members":
              return {
                ...simulatedCard,
                amount: data.membersToday.toString(),
              };
            case "Total Members":
              return {
                ...simulatedCard,
                amount: data.totalMember.toString(),
              };
            case "Blocked Members":
              return {
                ...simulatedCard,
                amount: data.blockedMembers.toString(),
              };
            case "Active E-PINs":
              return {
                ...simulatedCard,
                amount: data.activeEpins.toString(),
              };
            case "Inactive E-PINs":
              return {
                ...simulatedCard,
                amount: data.inactiveEpins.toString(),
              };
            case "Total E-PINs":
              return {
                ...simulatedCard,
                amount: data.totalEpins.toString(),
              };
            case "Total Level Income History":
              return {
                ...simulatedCard,
                amount: `₹${data.totalLevelIncome}`,
              };
            case "Total Direct Income History":
              return {
                ...simulatedCard,
                amount: `₹${data.totalDirectIncome}`,
              };
            default:
              return simulatedCard;
          }
        });

        setCardData(updatedCardData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

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
