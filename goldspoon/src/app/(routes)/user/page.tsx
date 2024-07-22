"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardTitle from "@/components/cards/dashboardTitle";
import {
  Users,
  DollarSign,
  ShoppingCart,
  PersonStanding,
  Package,
  Fingerprint,
  Braces,
  CreditCard,
} from "lucide-react";
import DashboardCard, {
  DashboardCardContent,
  DashboardCardProps,
} from "@/components/cards/dashboardCard";
import RecentWithdrawalsCard, {
  WithdrawalsProps,
} from "@/components/cards/recentWithdrawalsCard";

const initialCardData: DashboardCardProps[] = [
  {
    label: "Epin Id",
    amount: "...",
    description: "My current epin",
    icon: Fingerprint,
  },
  {
    label: "Current Group",
    amount: "...",
    description: "My current group",
    icon: Users,
  },
  {
    label: "Token Number",
    amount: "...",
    description: "My token number in group",
    icon: Braces,
  },
  {
    label: "Current Package",
    amount: "...",
    description: "My current package",
    icon: Package,
  },
  {
    label: "Total Renewal Income History",
    amount: "...",
    description: "Total renewal income generated",
    icon: DollarSign,
  },
  {
    label: "Total Level Income History",
    amount: "...",
    description: "Total level income generated",
    icon: DollarSign,
  },
  {
    label: "Total Wallet Balance",
    amount: "...",
    description: "Total balance in wallet",
    icon: DollarSign,
  },
  {
    label: "Approved Wallet Balance",
    amount: "...",
    description: "Total approved balance in wallet",
    icon: DollarSign,
  },
  {
    label: "My Status",
    amount: "...",
    description: "My epin status",
    icon: PersonStanding,
  },
  {
    label: "Total Withdrawals Count",
    amount: "...",
    description: "Total withdrawal operations",
    icon: CreditCard,
  },
  {
    label: "Total Withdrawals Amount",
    amount: "...",
    description: "Total amount withdrawn",
    icon: CreditCard,
  },
];

export default function Home() {
  const [cardData, setCardData] = useState<DashboardCardProps[]>(initialCardData);
  const [withdrawalsData, setWithdrawalsData] = useState<WithdrawalsProps[]>([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/dashboard/member", {
          headers: {
            adminMemberId: 1, 
          },
        });
        const data = response.data;
        const updatedCardData = data.map(card => ({
          label: card.label,
          amount: card.amount.toString(),
          description: card.description,
          icon: eval(card.icon),  // Adjust based on your icon handling strategy
        }));
        setCardData(updatedCardData);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    const fetchRecentWithdrawals = async () => {
      try {
        const response = await axios.get("http://localhost:8080/dashboard/recentWithdrawal", {
          headers: {
            adminMemberId: 1,
          },
        });
        const withdrawals = response.data.map(wd => ({
          epin: wd.epinNumber,
          date: wd.withdrawalDate,
          saleAmount: `+₹${wd.withdrawalAmount}`,
        }));
        setWithdrawalsData(withdrawals);
      } catch (error) {
        console.error("Error fetching recent withdrawals data:", error);
      }
    };

    fetchCardData();
    fetchRecentWithdrawals();
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
          <p>Recent Withdrawals</p>
          <p className="text-sm text-gray-400">
            You made these withdrawals recently.
          </p>
        </section>
        {withdrawalsData.map((d, i) => (
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
