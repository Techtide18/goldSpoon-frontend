"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function RetopUpMember() {
  const [formData, setFormData] = useState({
    memberId: "",
    pinPackage: "",
    group: "",
  });
  const [selectedPackageName, setSelectedPackageName] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [generatedEpin, setGeneratedEpin] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [groups, setGroups] = useState([]);
  const [packagesLoaded, setPackagesLoaded] = useState(false);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/package/all", {
        headers: {
          adminMemberId: 1,
        },
      });
      setPackages(response.data);
      setPackagesLoaded(true);
    } catch (error) {
      toast.error("Failed to fetch packages.");
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchMemberName = async () => {
      if (formData.memberId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/member/${formData.memberId}`,
            {
              headers: {
                adminMemberId: 1,
              },
            }
          );
          setMemberName(response.data.fullName || "");
        } catch (error) {
          toast.error("Failed to fetch member details.");
          setMemberName("");
        }
      } else {
        setMemberName("");
      }
    };

    fetchMemberName();
  }, [formData.memberId]);

  const fetchGroups = async (packageId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/group/package/${packageId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "e8f63d22-6a2d-42b0-845a-31f0f08e35b3",
            adminMemberId: 1,
          },
        }
      );
      setGroups(response.data);
    } catch (error) {
      toast.error("Failed to fetch groups.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePackageChange = async (value) => {
    const selectedPackage = packages.find((pkg) => pkg.id == value);
    setFormData({
      ...formData,
      pinPackage: value,
    });
    if (selectedPackage) {
      setSelectedPackageName(selectedPackage.packageName);
      await fetchGroups(value);
    } else {
      setSelectedPackageName("");
      setGroups([]);
    }
  };

  const handleGroupChange = (value) => {
    if (value === "auto-assign") {
      setSelectedGroupName("Auto Assign");
      setFormData({
        ...formData,
        group: "auto-assign",
      });
    } else {
      const selectedGroup = groups.find((grp) => grp.id == value);
      setSelectedGroupName(selectedGroup.groupName);
      setFormData({
        ...formData,
        group: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { memberId, pinPackage, group } = formData;

    if (!memberId || !pinPackage || !group) {
      return toast.error("Please fill out all fields.");
    }

    const requestData = {
      memberNumber: memberId,
      packageId: parseInt(pinPackage),
      automaticGroupAssign: group === "auto-assign",
    };

    if (group !== "auto-assign") {
      requestData.groupId = parseInt(group);
    }

    const toastId = toast.loading("Generating E-PIN...");

    try {
      const response = await axios.put(
        "http://localhost:8080/member/retopup",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            adminMemberId: 1,
          },
        }
      );

      const newEpin = response.data.epin;
      setGeneratedEpin(newEpin);

      toast.success("E-PIN generated successfully!", {
        id: toastId,
      });

      setIsDialogOpen(true);
      setFormData({
        memberId: "",
        pinPackage: "",
        group: "",
      });
      setSelectedPackageName("");
      setSelectedGroupName("");
    } catch (error) {
      toast.error("Failed to generate E-PIN.", {
        id: toastId,
      });
      console.error("Error generating E-PIN:", error);
    }
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>RE-TOPUP MEMBER</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="memberId">Member ID</Label>
              <Input
                id="memberId"
                name="memberId"
                placeholder="Member ID"
                value={formData.memberId}
                onChange={handleChange}
                required
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="pinPackage">Package</Label>
              <Select
                name="pinPackage"
                value={formData.pinPackage}
                onValueChange={handlePackageChange}
                required
                onOpenChange={(open) => {
                  if (open && !packagesLoaded) {
                    fetchPackages();
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Package">
                    {selectedPackageName || "Select Package"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id.toString()}>
                      {pkg.packageName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="group">Select Group</Label>
              <Select
                name="group"
                value={formData.group}
                onValueChange={handleGroupChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Group">
                    {selectedGroupName || "Select Group"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto-assign">Auto Assign</SelectItem>
                  {groups.map((grp) => (
                    <SelectItem key={grp.id} value={grp.id.toString()}>
                      {grp.groupName} ({grp.currentTokenCount}/{grp.maxTokenCapacity} tokens)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="memberName">Member Name</Label>
              <Input
                id="memberName"
                name="memberName"
                placeholder="Auto Generated"
                value={memberName}
                readOnly
                className="transition-colors duration-300 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" variant="destructive">
                Re-Topup Member
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => open && setIsDialogOpen(true)}
        className="mt-8 mb-8"
      >
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogTitle>New E-PIN generated for member</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-2">
              <p>
                <strong>New package:</strong> {selectedPackageName}
              </p>
              <p>
                <strong>New group assigned:</strong> {selectedGroupName}
              </p>
              <p>
                <strong>New E-PIN:</strong> {generatedEpin}
              </p>
              <div style={{ marginBottom: "20px" }}></div>
              <div className="mt-4 space-y-2">
                <p>Member ID is still the same</p>
                <p>First Installment pending...</p>
              </div>
            </div>
          </DialogDescription>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          <Button
            onClick={() => (window.location.href = "/admin/installments/add")}
          >
            Add Installment Details
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
