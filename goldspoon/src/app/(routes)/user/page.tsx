// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import DashboardTitle from "@/components/cards/dashboardTitle";
import {
  Users,
  DollarSign,
  PersonStanding,
  Package,
  Fingerprint,
  Braces,
  CreditCard,
  User,
} from "lucide-react";
import DashboardCard, {
  DashboardCardContent,
  DashboardCardProps,
} from "@/components/cards/dashboardCard";
import RecentWithdrawalsCard, {
  WithdrawalsProps,
} from "@/components/cards/recentWithdrawalsCard";
import { toast } from "sonner";

const initialCardData: DashboardCardProps[] = [
  {
    label: "Epin Id",
    amount: "...",
    description: "My current epin",
    icon: Fingerprint,
  },
  {
    label: "Member Id",
    amount: "...",
    description: "My member id",
    icon: User,
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
    label: "Renewal Income History",
    amount: "...",
    description: "Total renewal income generated",
    icon: DollarSign,
  },
  {
    label: "Level Income History",
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
  const [memberNumber, setMemberNumber] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const session = await getSession();
      if (!session || !session.user || !session.user.name) {
        toast.error("You must be logged in to view this information.");
        return;
      }

      setMemberNumber(session.user.name);

      try {
        const cardResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/member`, {
          params: {
            memberNumber: session.user.name,
          },
        });

        const dashboardData = cardResponse.data;
        const cardData = [
          {
            label: "Epin Id",
            amount: dashboardData.epinNumber,
            description: "My current epin",
            icon: Fingerprint,
          },
          {
            label: "Member Id",
            amount: session.user.name,
            description: "My member id",
            icon: User,
          },
          {
            label: "Current Group",
            amount: dashboardData.groupName,
            description: "My current group",
            icon: Users,
          },
          {
            label: "Token Number",
            amount: dashboardData.tokenNumber.toString(),
            description: "My token number in group",
            icon: Braces,
          },
          {
            label: "Current Package",
            amount: dashboardData.packageName,
            description: "My current package",
            icon: Package,
          },
          {
            label: "Renewal Income History",
            amount: dashboardData.totalDirectIncome.toString(),
            description: "Total renewal income generated",
            icon: DollarSign,
          },
          {
            label: "Level Income History",
            amount: dashboardData.totalLevelIncome.toString(),
            description: "Total level income generated",
            icon: DollarSign,
          },
          {
            label: "Total Wallet Balance",
            amount: dashboardData.totalWalletBalance.toString(),
            description: "Total balance in wallet",
            icon: DollarSign,
          },
          {
            label: "Approved Wallet Balance",
            amount: dashboardData.totalApprovedBalance.toString(),
            description: "Total approved balance in wallet",
            icon: DollarSign,
          },
          {
            label: "My Status",
            amount: dashboardData.epinActive ? "Active" : "Inactive",
            description: "My epin status",
            icon: PersonStanding,
          },
          {
            label: "Total Withdrawals Count",
            amount: dashboardData.totalWithdrawals.toString(),
            description: "Total withdrawal operations",
            icon: CreditCard,
          },
          {
            label: "Total Withdrawals Amount",
            amount: dashboardData.getTotalApprovedWithdrawalAmount.toString(),
            description: "Total amount withdrawn",
            icon: CreditCard,
          },
        ];
        setCardData(cardData);
      } catch (error) {
        console.error("Error fetching card data:", error);
        toast.error("Failed to fetch card data.");
      }

      try {
        const withdrawalResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payout/withdrawalRequest/Details`, {
          params: {
            pageSize: 5,
            pageNumber: 0,
            memberNumber: session.user.name,
          },
        });

        const withdrawals = withdrawalResponse.data.content.map((wd, index) => ({
          epin: new Date(wd.withdrawalDate).toLocaleDateString(),
          date: "Withdrawal date",
          saleAmount: `+₹${wd.adminCharge}`,
        }));
        setWithdrawalsData(withdrawals);
      } catch (error) {
        console.error("Error fetching withdrawals data:", error);
        toast.error("Failed to fetch withdrawals data.");
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
