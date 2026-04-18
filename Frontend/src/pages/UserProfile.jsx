import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router";
import { useGetUserQuery } from "@/features/api/authApi";
import Loader from "@/components/custom/Loader";
import { useEffect } from "react";

const UserProfile = () => {
  const navigate = useNavigate();
  const { data, error, isSuccess,  isLoading, refetch } = useGetUserQuery();

  if (error) <h1>Profile Error</h1>
  // if (isLoading) <h1>Loading...</h1>
  const { user } = data || {};
  useEffect(()=>{
    if(isSuccess || data){
      refetch();
    }
  },[data, isSuccess, refetch])
  return (
    <div>
      {
        isLoading ? (<>
          <div>
            <Loader/>
          </div>
        </>) : (
          <>
            <section className="min-h-screen bg-muted/40 px-4 py-8">
              <div className="max-w-6xl mx-auto space-y-6">

                {/* Profile Header */}
                <Card className="p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.profileUrl || 'https://i.pravatar.cc/150'} />
                      <AvatarFallback>VK</AvatarFallback>
                    </Avatar>

                    <div className="text-center sm:text-left flex-1">
                      <h2 className="text-2xl font-semibold">
                        {user?.name}
                      </h2>
                      <p className="text-muted-foreground">
                        Learner • {user?.goals}
                      </p>
                    </div>

                    <Button onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
                  </div>
                </Card>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-2xl font-bold">{user?.enrolledCourses.length}</h3>
                      <p className="text-muted-foreground">Courses Enrolled</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-2xl font-bold">85+</h3>
                      <p className="text-muted-foreground">Hours Learned</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-2xl font-bold">6</h3>
                      <p className="text-muted-foreground">Certificates</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-2xl font-bold">Intermediate</h3>
                      <p className="text-muted-foreground">Skill Level</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Personal Information */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoItem label="Full Name" value={user?.name} />
                      <InfoItem label="Email" value={user?.email} />
                      <InfoItem label="Phone" value={user?.phoneNumber} />
                      <InfoItem label="Role" value={user?.role?.charAt(0).toUpperCase() + user?.role.slice(1)} />
                      <InfoItem label="Course Track" value={user?.goals} />
                      <InfoItem
                        label="Joined On"
                        value={user?.createdAt ? new Date(user?.createdAt).toLocaleDateString() : ""}
                      />

                    </div>
                  </CardContent>
                </Card>

              </div>
            </section>
          </>
        )
      }
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default UserProfile;
