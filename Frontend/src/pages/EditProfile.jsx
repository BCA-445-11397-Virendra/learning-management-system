/* eslint-disable react-hooks/set-state-in-effect */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router";
import { useGetUserQuery, useUpdateUserMutation } from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import  Loader from "@/components/custom/Loader";

const EditProfile = () => {
  const [updateProfile, setUpdateProfile] = useState({
    name: "",
    phoneNumber: "",
    goals: "",
    location: "",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUserQuery();
  const user = data?.user;


  const [updateUser, { data: updateData, isSuccess: updateIsSuccess, error: updateIsError, isLoading: updateLoading }] =
    useUpdateUserMutation();
  useEffect(() => {
    if (user) {
      setUpdateProfile({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        goals: user.goals || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitUpdate = async () => {
    const formData = new FormData();
    formData.append("name", updateProfile.name);
    formData.append("phoneNumber", updateProfile.phoneNumber);
    formData.append("goals", updateProfile.goals);
    formData.append("location", updateProfile.location);

    if (file) {
      formData.append("profileUrl", file);
    }

    await updateUser(formData);
    // console.log(formData)
    navigate("/profile");
  };
  useEffect(() => {
    if (updateIsSuccess) {
      toast.success(updateData?.message);
    }

    if (updateIsError) {
      toast.error(updateIsError?.data?.message);
    }
  }, [updateIsSuccess, updateIsError, updateData]);


  // if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Profile Error</h1>;

  return (
    <div>
      {
        isLoading ? <>
          <div>
            <Loader/>
          </div>
        </> :
          <>
            <section className="min-h-screen bg-muted/40 px-4 py-8">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    {/* Profile Image */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <Avatar className="h-28 w-28">
                        <AvatarImage
                          src={user?.profileUrl || "https://i.pravatar.cc/150"}
                        />
                        <AvatarFallback>VK</AvatarFallback>
                      </Avatar>

                      <div className="space-y-2">
                        <Label>Profile Photo</Label>
                        <Input type="file" accept="image/*" onChange={handleFileChange} />
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Personal Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            name="name"
                            value={updateProfile.name}
                            onChange={handleChangeInput}
                          />
                        </div>

                        <div>
                          <Label>Email</Label>
                          <Input value={user?.email || ""} disabled />
                        </div>

                        <div>
                          <Label>Phone</Label>
                          <Input
                            name="phoneNumber"
                            value={updateProfile.phoneNumber}
                            onChange={handleChangeInput}
                          />
                        </div>

                        <div>
                          <Label>Role</Label>
                          <Input
                            value={
                              user?.role
                                ? user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)
                                : ""
                            }
                            disabled
                          />
                        </div>

                        <div>
                          <Label>Goal</Label>
                          <Input
                            name="goals"
                            value={updateProfile.goals}
                            onChange={handleChangeInput}
                          />
                        </div>

                        <div>
                          <Label>Location</Label>
                          <Input
                            name="location"
                            value={updateProfile.location}
                            onChange={handleChangeInput}
                          />
                        </div>
                      </div>
                    </div>

  

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                      <Button variant="outline" onClick={() => navigate("/profile")}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitUpdate} disabled={updateLoading}>
                        {updateLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </>
      }
    </div>
  );
};

export default EditProfile;
