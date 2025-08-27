// Mock authentication data
export const mockUsers = [
  // Teachers
  { username: 'teacher1', password: 'pass123', role: 'teacher', name: 'Vishnu Neupane', id: 't1' },
  { username: 'teacher2', password: 'pass123', role: 'teacher', name: 'Roshan Khanal', id: 't2' },
  { username: 'teacher3', password: 'pass123', role: 'teacher', name: 'Bhuban Panthee', id: 't3' },
  
  // Administrators
  { username: 'admin1', password: 'admin123', role: 'admin', name: 'Admin User', id: 'a1' },
];

// Mock students data
export const mockStudents = [
  { id: 's1', name: 'Emma Johnson', rollNo: 'CS001', class: 'Computer Science A', email: 'emma.j@college.edu' },
  { id: 's2', name: 'Liam Brown', rollNo: 'CS002', class: 'Computer Science A', email: 'liam.b@college.edu' },
  { id: 's3', name: 'Olivia Davis', rollNo: 'CS003', class: 'Computer Science A', email: 'olivia.d@college.edu' },
  { id: 's4', name: 'Noah Wilson', rollNo: 'CS004', class: 'Computer Science A', email: 'noah.w@college.edu' },
  { id: 's5', name: 'Ava Miller', rollNo: 'CS005', class: 'Computer Science A', email: 'ava.m@college.edu' },
  { id: 's6', name: 'Ethan Garcia', rollNo: 'CS006', class: 'Computer Science B', email: 'ethan.g@college.edu' },
  { id: 's7', name: 'Sophia Martinez', rollNo: 'CS007', class: 'Computer Science B', email: 'sophia.m@college.edu' },
  { id: 's8', name: 'Mason Anderson', rollNo: 'CS008', class: 'Computer Science B', email: 'mason.a@college.edu' },
  { id: 's9', name: 'Isabella Taylor', rollNo: 'CS009', class: 'Computer Science B', email: 'isabella.t@college.edu' },
  { id: 's10', name: 'William Thomas', rollNo: 'CS010', class: 'Computer Science B', email: 'william.t@college.edu' },
  { id: 's11', name: 'Charlotte Jackson', rollNo: 'ME001', class: 'Mechanical A', email: 'charlotte.j@college.edu' },
  { id: 's12', name: 'James White', rollNo: 'ME002', class: 'Mechanical A', email: 'james.w@college.edu' },
  { id: 's13', name: 'Amelia Harris', rollNo: 'ME003', class: 'Mechanical A', email: 'amelia.h@college.edu' },
  { id: 's14', name: 'Benjamin Clark', rollNo: 'ME004', class: 'Mechanical A', email: 'benjamin.c@college.edu' },
  { id: 's15', name: 'Mia Lewis', rollNo: 'ME005', class: 'Mechanical A', email: 'mia.l@college.edu' },
];

// Mock classes data
export const mockClasses = [
  { 
    id: 'c1', 
    name: 'Computer Science A', 
    subject: 'Data Structures', 
    teacherId: 't1',
    schedule: 'Mon-Wed-Fri 9:00-10:30',
    students: ['s1', 's2', 's3', 's4', 's5']
  },
  { 
    id: 'c2', 
    name: 'Computer Science B', 
    subject: 'Algorithms', 
    teacherId: 't1',
    schedule: 'Tue-Thu 11:00-12:30',
    students: ['s6', 's7', 's8', 's9', 's10']
  },
  { 
    id: 'c3', 
    name: 'Mechanical A', 
    subject: 'Thermodynamics', 
    teacherId: 't2',
    schedule: 'Mon-Wed-Fri 14:00-15:30',
    students: ['s11', 's12', 's13', 's14', 's15']
  },
];

// Mock attendance data
export const mockAttendance = [
  {
    id: 'att1',
    classId: 'c1',
    teacherId: 't1',
    date: '2024-01-15',
    students: [
      { studentId: 's1', status: 'present' },
      { studentId: 's2', status: 'present' },
      { studentId: 's3', status: 'absent' },
      { studentId: 's4', status: 'present' },
      { studentId: 's5', status: 'present' },
    ]
  },
  {
    id: 'att2',
    classId: 'c2',
    teacherId: 't1', 
    date: '2024-01-15',
    students: [
      { studentId: 's6', status: 'present' },
      { studentId: 's7', status: 'present' },
      { studentId: 's8', status: 'present' },
      { studentId: 's9', status: 'absent' },
      { studentId: 's10', status: 'present' },
    ]
  }
];

export type User = typeof mockUsers[0];
export type Student = typeof mockStudents[0];
export type Class = typeof mockClasses[0];
export type AttendanceRecord = typeof mockAttendance[0];