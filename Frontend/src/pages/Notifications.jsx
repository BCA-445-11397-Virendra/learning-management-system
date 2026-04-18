import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Link as LinkIcon,
  ClipboardList,
  Bell,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "message",
    title: "Class Update",
    description:
      "Tomorrow's Java Full Stack class will start at 10 AM.",
    sender: "Admin",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "pdf",
    title: "Spring Boot Notes",
    description: "Download Spring Boot chapter 3 notes.",
    sender: "Admin",
    time: "Yesterday",
    fileUrl: "#",
  },
  {
    id: 3,
    type: "assessment",
    title: "DSA Weekly Test",
    description: "Complete the assessment before Sunday.",
    sender: "Admin",
    time: "2 days ago",
    assessmentUrl: "#",
  },
  {
    id: 4,
    type: "link",
    title: "React Recording",
    description: "Watch the recorded React session.",
    sender: "Admin",
    time: "3 days ago",
    linkUrl: "https://react.dev",
  },
];

const getIcon = (type) => {
  switch (type) {
    case "pdf":
      return <FileText className="text-red-500" />;
    case "assessment":
      return <ClipboardList className="text-purple-500" />;
    case "link":
      return <LinkIcon className="text-blue-500" />;
    default:
      return <Bell className="text-green-500" />;
  }
};

const Notifications = () => {
  return (
    <section className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Notifications
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Messages and updates from admin
          </p>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {notifications.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition">
              <CardContent className="p-4 flex gap-4">

                {/* Icon */}
                <div className="mt-1">
                  {getIcon(item.type)}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-1">
                    <span>From: {item.sender}</span>
                    <span>{item.time}</span>
                  </div>

                  {/* Action Buttons */}
                  {item.type === "pdf" && (
                    <Button size="sm" variant="outline" className="mt-2">
                      Download PDF
                    </Button>
                  )}

                  {item.type === "assessment" && (
                    <Button size="sm" className="mt-2">
                      Start Assessment
                    </Button>
                  )}

                  {item.type === "link" && (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      className="inline-block mt-2 text-sm text-blue-600 underline"
                    >
                      Open Link
                    </a>
                  )}
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Notifications;
