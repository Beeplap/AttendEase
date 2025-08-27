import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Users, 
  Clock, 
  CheckCircle, 
  Calendar,
  UserCheck,
  Share2,
  LogOut,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { mockClasses, mockStudents, mockAttendance } from '../utils/mockData';
import { toast } from 'sonner';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const [isPunchedIn, setIsPunchedIn] = useState(false);

  // Get teacher's classes
  const teacherClasses = mockClasses.filter(c => c.teacherId === user?.id);
  
  // Get today's attendance stats
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = mockAttendance.filter(a => a.date === today && a.teacherId === user?.id);
  
  const totalStudentsToday = todayAttendance.reduce((acc, att) => acc + att.students.length, 0);
  const presentStudentsToday = todayAttendance.reduce(
    (acc, att) => acc + att.students.filter(s => s.status === 'present').length, 
    0
  );

  const handlePunchIn = () => {
    setIsPunchedIn(true);
    toast.success('Successfully punched in for today!');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
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
                <p className="text-xs text-muted-foreground">Teacher Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">Teacher</p>
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
            Welcome back, {user?.name}!
          </h2>
          <p className="text-muted-foreground">
            Manage your classes and track attendance efficiently.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Punch In Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                Daily Punch-In
              </CardTitle>
              <CardDescription>
                Record your presence for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isPunchedIn ? (
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Punched In</span>
                </div>
              ) : (
                <Button 
                  onClick={handlePunchIn}
                  className="w-full bg-primary hover:bg-primary-dark"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Punch In Now
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Today's Classes */}
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-secondary">
                <BookOpen className="w-5 h-5" />
                Today's Classes
              </CardTitle>
              <CardDescription>
                {teacherClasses.length} classes assigned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                {teacherClasses.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Active classes
              </p>
            </CardContent>
          </Card>

          {/* Attendance Summary */}
          <Card className="bg-gradient-to-br from-info/10 to-info/5 border-info/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-info">
                <TrendingUp className="w-5 h-5" />
                Today's Attendance
              </CardTitle>
              <CardDescription>
                Overall attendance rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">
                {totalStudentsToday > 0 ? Math.round((presentStudentsToday / totalStudentsToday) * 100) : 0}%
              </div>
              <p className="text-sm text-muted-foreground">
                {presentStudentsToday}/{totalStudentsToday} present
              </p>
            </CardContent>
          </Card>
        </div>

        {/* My Classes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              My Classes
            </CardTitle>
            <CardDescription>
              Manage and take attendance for your assigned classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacherClasses.map((classItem) => {
                const classStudents = mockStudents.filter(s => classItem.students.includes(s.id));
                
                return (
                  <Card key={classItem.id} className="border border-border/50 hover:border-primary/30 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{classItem.name}</CardTitle>
                          <CardDescription>{classItem.subject}</CardDescription>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>{classStudents.length} students</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {classItem.schedule}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <UserCheck className="w-4 h-4 mr-1" />
                          Take Attendance
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share Access
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TeacherDashboard;