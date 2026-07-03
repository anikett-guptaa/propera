import type { Room } from "./room-types";

export const mockRooms: Room[] = [
  // Gupta Boys Hostel - 4 floors, 10 rooms each
  { id: "r1", number: "101", floor: 1, propertyId: "1", status: "occupied", rent: "Rs.7,500", type: "single", tenant: { name: "Rohit Sharma", since: "Jan 2025", rent: "Rs.7,500" } },
  { id: "r2", number: "102", floor: 1, propertyId: "1", status: "occupied", rent: "Rs.7,500", type: "single", tenant: { name: "Anil Kumar", since: "Mar 2025", rent: "Rs.7,500" } },
  { id: "r3", number: "103", floor: 1, propertyId: "1", status: "vacant", rent: "Rs.7,500", type: "single" },
  { id: "r4", number: "104", floor: 1, propertyId: "1", status: "occupied", rent: "Rs.9,000", type: "double", tenant: { name: "Karan Singh", since: "Feb 2025", rent: "Rs.9,000" } },
  { id: "r5", number: "105", floor: 1, propertyId: "1", status: "occupied", rent: "Rs.9,000", type: "double", tenant: { name: "Raj Patel", since: "Apr 2025", rent: "Rs.9,000" } },
  { id: "r6", number: "106", floor: 1, propertyId: "1", status: "maintenance", rent: "Rs.7,500", type: "single", lastCleaned: "Jun 1" },
  { id: "r7", number: "107", floor: 1, propertyId: "1", status: "occupied", rent: "Rs.7,500", type: "single", tenant: { name: "Suresh Nair", since: "Jan 2025", rent: "Rs.7,500" } },
  { id: "r8", number: "108", floor: 1, propertyId: "1", status: "occupied", rent: "Rs.7,500", type: "single", tenant: { name: "Dinesh Kumar", since: "May 2025", rent: "Rs.7,500" } },
  { id: "r9", number: "109", floor: 1, propertyId: "1", status: "occupied", rent: "Rs.9,000", type: "double", tenant: { name: "Vikram Mehta", since: "Feb 2025", rent: "Rs.9,000" } },
  { id: "r10", number: "110", floor: 1, propertyId: "1", status: "vacant", rent: "Rs.7,500", type: "single" },

  { id: "r11", number: "201", floor: 2, propertyId: "1", status: "occupied", rent: "Rs.8,000", type: "single", tenant: { name: "Arjun Verma", since: "Jan 2025", rent: "Rs.8,000" } },
  { id: "r12", number: "202", floor: 2, propertyId: "1", status: "occupied", rent: "Rs.8,000", type: "single", tenant: { name: "Manoj Tiwari", since: "Mar 2025", rent: "Rs.8,000" } },
  { id: "r13", number: "203", floor: 2, propertyId: "1", status: "occupied", rent: "Rs.8,000", type: "single", tenant: { name: "Ravi Gupta", since: "Feb 2025", rent: "Rs.8,000" } },
  { id: "r14", number: "204", floor: 2, propertyId: "1", status: "occupied", rent: "Rs.9,500", type: "double", tenant: { name: "Sanjay Iyer", since: "Jan 2025", rent: "Rs.9,500" } },
  { id: "r15", number: "205", floor: 2, propertyId: "1", status: "vacant", rent: "Rs.8,000", type: "single" },
  { id: "r16", number: "206", floor: 2, propertyId: "1", status: "occupied", rent: "Rs.8,000", type: "single", tenant: { name: "Prem Chand", since: "Apr 2025", rent: "Rs.8,000" } },
  { id: "r17", number: "207", floor: 2, propertyId: "1", status: "occupied", rent: "Rs.8,000", type: "single", tenant: { name: "Karan Singh", since: "Dec 2024", rent: "Rs.8,000" } },
  { id: "r18", number: "208", floor: 2, propertyId: "1", status: "maintenance", rent: "Rs.8,000", type: "single", lastCleaned: "May 28" },
  { id: "r19", number: "209", floor: 2, propertyId: "1", status: "occupied", rent: "Rs.9,500", type: "double", tenant: { name: "Ravi Tiwari", since: "Jan 2025", rent: "Rs.9,500" } },
  { id: "r20", number: "210", floor: 2, propertyId: "1", status: "occupied", rent: "Rs.8,000", type: "single", tenant: { name: "Nitin Joshi", since: "Mar 2025", rent: "Rs.8,000" } },

  { id: "r21", number: "301", floor: 3, propertyId: "1", status: "occupied", rent: "Rs.8,500", type: "single", tenant: { name: "Amit Sharma", since: "Feb 2025", rent: "Rs.8,500" } },
  { id: "r22", number: "302", floor: 3, propertyId: "1", status: "occupied", rent: "Rs.8,500", type: "single", tenant: { name: "Deepak Roy", since: "Jan 2025", rent: "Rs.8,500" } },
  { id: "r23", number: "303", floor: 3, propertyId: "1", status: "vacant", rent: "Rs.8,500", type: "single" },
  { id: "r24", number: "304", floor: 3, propertyId: "1", status: "occupied", rent: "Rs.10,000", type: "double", tenant: { name: "Gaurav Nair", since: "Mar 2025", rent: "Rs.10,000" } },
  { id: "r25", number: "305", floor: 3, propertyId: "1", status: "occupied", rent: "Rs.8,500", type: "single", tenant: { name: "Ramesh Pillai", since: "Jan 2025", rent: "Rs.8,500" } },
  { id: "r26", number: "306", floor: 3, propertyId: "1", status: "occupied", rent: "Rs.8,500", type: "single", tenant: { name: "Ankit Gupta", since: "Apr 2025", rent: "Rs.8,500" } },
  { id: "r27", number: "307", floor: 3, propertyId: "1", status: "occupied", rent: "Rs.10,000", type: "double", tenant: { name: "Siddharth Rao", since: "Feb 2025", rent: "Rs.10,000" } },
  { id: "r28", number: "308", floor: 3, propertyId: "1", status: "occupied", rent: "Rs.8,500", type: "single", tenant: { name: "Vivek Singh", since: "May 2025", rent: "Rs.8,500" } },
  { id: "r29", number: "309", floor: 3, propertyId: "1", status: "occupied", rent: "Rs.8,500", type: "single", tenant: { name: "Ajay Kumar", since: "Jan 2025", rent: "Rs.8,500" } },
  { id: "r30", number: "310", floor: 3, propertyId: "1", status: "occupied", rent: "Rs.8,500", type: "single", tenant: { name: "Harish Nair", since: "Mar 2025", rent: "Rs.8,500" } },

  { id: "r31", number: "401", floor: 4, propertyId: "1", status: "occupied", rent: "Rs.9,000", type: "single", tenant: { name: "Mohan Das", since: "Feb 2025", rent: "Rs.9,000" } },
  { id: "r32", number: "402", floor: 4, propertyId: "1", status: "occupied", rent: "Rs.9,000", type: "single", tenant: { name: "Tarun Bose", since: "Jan 2025", rent: "Rs.9,000" } },
  { id: "r33", number: "403", floor: 4, propertyId: "1", status: "vacant", rent: "Rs.9,000", type: "single" },
  { id: "r34", number: "404", floor: 4, propertyId: "1", status: "occupied", rent: "Rs.11,000", type: "double", tenant: { name: "Pranav Iyer", since: "Mar 2025", rent: "Rs.11,000" } },
  { id: "r35", number: "405", floor: 4, propertyId: "1", status: "occupied", rent: "Rs.9,000", type: "single", tenant: { name: "Ashok Verma", since: "Jan 2025", rent: "Rs.9,000" } },
  { id: "r36", number: "406", floor: 4, propertyId: "1", status: "occupied", rent: "Rs.9,000", type: "single", tenant: { name: "Rakesh Mehta", since: "Apr 2025", rent: "Rs.9,000" } },
  { id: "r37", number: "407", floor: 4, propertyId: "1", status: "occupied", rent: "Rs.9,000", type: "single", tenant: { name: "Naresh Kumar", since: "Feb 2025", rent: "Rs.9,000" } },
  { id: "r38", number: "408", floor: 4, propertyId: "1", status: "occupied", rent: "Rs.11,000", type: "double", tenant: { name: "Kapil Sharma", since: "Jan 2025", rent: "Rs.11,000" } },
  { id: "r39", number: "409", floor: 4, propertyId: "1", status: "occupied", rent: "Rs.9,000", type: "single", tenant: { name: "Vishal Roy", since: "May 2025", rent: "Rs.9,000" } },
  { id: "r40", number: "410", floor: 4, propertyId: "1", status: "occupied", rent: "Rs.9,000", type: "single", tenant: { name: "Sumit Nair", since: "Mar 2025", rent: "Rs.9,000" } },
];

export const mockProperties = [
  { id: "1", name: "Gupta Boys Hostel" },
  { id: "2", name: "Gupta Girls PG" },
  { id: "3", name: "Sunrise Apartments" },
];