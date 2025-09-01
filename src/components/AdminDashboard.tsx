import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  BookOpen, 
  Settings,
  LogOut,
  TrendingUp,
  Calendar,
  FileText,
  Activity,
  Plus,
  Eye
} from 'lucide-react';
import { mockStudents, mockClasses, mockUsers, mockAttendance } from '../utils/mockData';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

const AdminDashboard = () => {
  // State for Add Student dialog and form
  const [studentName, setStudentName] = React.useState('');
  const [studentEmail, setStudentEmail] = React.useState('');

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) {
      toast.error('Please fill in all fields.');
      return;
    }
    // Here you would add logic to actually add the student
    toast.success(`Student ${studentName} added!`);
    setStudentName('');
    setStudentEmail('');
  };
  const { user, logout } = useAuth();

  const totalStudents = mockStudents.length;
  const totalTeachers = mockUsers.filter(u => u.role === 'teacher').length;
  const totalClasses = mockClasses.length;
  
  // Calculate overall attendance rate
  const totalAttendanceRecords = mockAttendance.reduce((acc, att) => acc + att.students.length, 0);
  const presentRecords = mockAttendance.reduce(
    (acc, att) => acc + att.students.filter(s => s.status === 'present').length, 
    0
  );
  const attendanceRate = totalAttendanceRecords > 0 ? Math.round((presentRecords / totalAttendanceRecords) * 100) : 0;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
  };

  // State for dialog and form
  const [teacherName, setTeacherName] = React.useState('');
  const [teacherEmail, setTeacherEmail] = React.useState('');

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName || !teacherEmail) {
      toast.error('Please fill in all fields.');
      return;
    }
    // Here you would add logic to actually add the teacher
    toast.success(`Teacher ${teacherName} added!`);
    setTeacherName('');
    setTeacherEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AttendEase</h1>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h2>
          <p className="text-muted-foreground">
            Manage the attendance system and oversee all operations.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-primary text-lg">
                <Users className="w-5 h-5" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalStudents}</div>
              <p className="text-sm text-muted-foreground">Enrolled students</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-secondary text-lg">
                <UserCheck className="w-5 h-5" />
                Teachers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{totalTeachers}</div>
              <p className="text-sm text-muted-foreground">Active teachers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-info/10 to-info/5 border-info/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-info text-lg">
                <BookOpen className="w-5 h-5" />
                Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-info">{totalClasses}</div>
              <p className="text-sm text-muted-foreground">Total classes</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-success text-lg">
                <TrendingUp className="w-5 h-5" />
                Attendance Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{attendanceRate}%</div>
              <p className="text-sm text-muted-foreground">Overall rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Student Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Student Management
              </CardTitle>
              <CardDescription>
                Add, edit, or remove student records from the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Student</DialogTitle>
                      <DialogDescription>Enter the student's details below.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddStudent} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                          value={studentName}
                          onChange={e => setStudentName(e.target.value)}
                          placeholder="Student Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                          type="email"
                          className="w-full border rounded px-3 py-2"
                          value={studentEmail}
                          onChange={e => setStudentEmail(e.target.value)}
                          placeholder="student@email.com"
                        />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add Student</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Currently managing {totalStudents} students across all classes
              </p>
            </CardContent>
          </Card>

          {/* Teacher Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Teacher Management
              </CardTitle>
              <CardDescription>
                Manage teacher accounts and class assignments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1" variant="secondary">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Teacher
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Teacher</DialogTitle>
                      <DialogDescription>Enter the teacher's details below.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddTeacher} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                          value={teacherName}
                          onChange={e => setTeacherName(e.target.value)}
                          placeholder="Teacher Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                          type="email"
                          className="w-full border rounded px-3 py-2"
                          value={teacherEmail}
                          onChange={e => setTeacherEmail(e.target.value)}
                          placeholder="teacher@email.com"
                        />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add Teacher</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {totalTeachers} active teachers in the system
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reports and Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Reports & Analytics
              </CardTitle>
              <CardDescription>
                Generate detailed attendance reports and analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Daily Report
                </Button>
                <Button variant="outline" className="flex-1">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </div>
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Generate Full Report
              </Button>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Settings
              </CardTitle>
              <CardDescription>
                Configure system preferences and user permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Users className="w-4 h-4 mr-2" />
                  User Roles
                </Button>
                <Button variant="outline" className="flex-1">
                  <Activity className="w-4 h-4 mr-2" />
                  Activity Log
                </Button>
              </div>
              <Button className="w-full" variant="secondary">
                <Settings className="w-4 h-4 mr-2" />
                System Preferences
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest system activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Smith marked attendance for Computer Science A</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-info rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New student Emma Johnson added to the system</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sarah Wilson shared class access with Michael Davis</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;