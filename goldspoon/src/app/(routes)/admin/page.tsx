// @ts-nocheck
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

const initialCardData: DashboardCardProps[] = [
  {
    label: "Today's Members",
    amount: "...",
    description: "New members joined today",
    icon: Users,
  },
  {
    label: "Total Members",
    amount: "...",
    description: "Total members in the system",
    icon: Users,
  },
  {
    label: "Blocked Members",
    amount: "...",
    description: "Members currently blocked",
    icon: Users,
  },
  {
    label: "Active E-PINs",
    amount: "...",
    description: "E-PINs currently active",
    icon: ShoppingCart,
  },
  {
    label: "Inactive E-PINs",
    amount: "...",
    description: "E-PINs currently inactive",
    icon: ShoppingCart,
  },
  {
    label: "Total E-PINs",
    amount: "...",
    description: "Total E-PINs generated",
    icon: ShoppingCart,
  },
  {
    label: "Total Level Income History",
    amount: "...",
    description: "Total income from levels",
    icon: DollarSign,
  },
  {
    label: "Total Direct Income History",
    amount: "...",
    description: "Total direct income earned",
    icon: DollarSign,
  },
  {
    label: "Total Withdrawals Count",
    amount: "...",
    description: "Total withdrawals made",
    icon: ArrowBigDownDashIcon,
  },
  {
    label: "Total Withdrawals Amount",
    amount: "...",
    description: "Total amount withdrawn",
    icon: DollarSign,
  },
  {
    label: "Total Packages",
    amount: "...",
    description: "Total available packages",
    icon: Package,
  },
  {
    label: "Total Groups",
    amount: "...",
    description: "Total groups present",
    icon: PersonStanding,
  },
];

export default function Home() {
  const [cardData, setCardData] =
    useState<DashboardCardProps[]>(initialCardData);
  const [userSalesData, setUserSalesData] = useState<SalesProps[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://goldspoon.in/api/dashboard", {
          headers: {
            adminMemberId: 1,
          },
        });
        const data = response.data;

        const updatedCardData: DashboardCardProps[] = [
          {
            label: "Today's Members",
            amount: data.membersToday.toString(),
            description: "New members joined today",
            icon: Users,
          },
          {
            label: "Total Members",
            amount: data.totalMember.toString(),
            description: "Total members in the system",
            icon: Users,
          },
          {
            label: "Blocked Members",
            amount: data.blockedMembers.toString(),
            description: "Members currently blocked",
            icon: Users,
          },
          {
            label: "Active E-PINs",
            amount: data.activeEpins.toString(),
            description: "E-PINs currently active",
            icon: ShoppingCart,
          },
          {
            label: "Inactive E-PINs",
            amount: data.inactiveEpins.toString(),
            description: "E-PINs currently inactive",
            icon: ShoppingCart,
          },
          {
            label: "Total E-PINs",
            amount: data.totalEpins.toString(),
            description: "Total E-PINs generated",
            icon: ShoppingCart,
          },
          {
            label: "Total Level Income History",
            amount: `₹${data.totalLevelIncome}`,
            description: "Total income from levels",
            icon: DollarSign,
          },
          {
            label: "Total Direct Income History",
            amount: `₹${data.totalDirectIncome}`,
            description: "Total direct income earned",
            icon: DollarSign,
          },
          {
            label: "Total Withdrawals Count",
            amount: data.totalWithdrawals.toString(),
            description: "Total withdrawals made",
            icon: ArrowBigDownDashIcon,
          },
          {
            label: "Total Withdrawals Amount",
            amount: `₹${data.totalAmountWithdrawals}`,
            description: "Total amount withdrawn",
            icon: DollarSign,
          },
          {
            label: "Total Packages",
            amount: data.totalPackages.toString(),
            description: "Total available packages",
            icon: Package,
          },
          {
            label: "Total Groups",
            amount: data.totalGroups.toString(),
            description: "Total groups present",
            icon: PersonStanding,
          },
        ];

        setCardData(updatedCardData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchRecentSales = async () => {
      try {
        const response = await axios.get(
          "https://goldspoon.in/api/dashboard/sale?pageSize=10&pageNumber=0",
          {
            headers: {
              adminMemberId: 1,
            },
          }
        );
        const salesData = response.data.content.map((sale: any) => ({
          name: "Epin: " + sale.epinNumber,
          email: "Reffered by: " + (sale.referredByMemberNumber || "None"),
          saleAmount: `+₹${sale.packagePrice}`,
        }));
        setUserSalesData(salesData);
      } catch (error) {
        console.error("Error fetching recent sales data:", error);
      }
    };

    fetchDashboardData();
    fetchRecentSales();
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
            Last 10 epin sales this month.
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
