import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";

const studentAccount = {
  name: "Virendra Kumar",
  email: "virendra@gmail.com",
  phone: "+91 98765 43210",
  role: "Student",
  joined: "Jan 2025",
  avatar: "https://i.pravatar.cc/150",
};

const Account = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={studentAccount.avatar} />
              <AvatarFallback>VK</AvatarFallback>
            </Avatar>

            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-semibold">
                {studentAccount.name}
              </h2>
              <p className="text-sm text-gray-500">
                {studentAccount.role}
              </p>
              <p className="text-xs text-gray-400">
                Joined {studentAccount.joined}
              </p>
            </div>

            <Button onClick = {()=>navigate('/edit-profile')}>Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Account Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Personal Information</h3>

              <InfoItem icon={<Mail />} label="Email" value={studentAccount.email} />
              <InfoItem icon={<Phone />} label="Phone" value={studentAccount.phone} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Security</h3>

              <InfoItem
                icon={<ShieldCheck />}
                label="Password"
                value="********"
              />

              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </CardContent>
          </Card>

        </div>

      </div>
    </section>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <span className="text-gray-500">{icon}</span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

export default Account;
