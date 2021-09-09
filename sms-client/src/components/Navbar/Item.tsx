export const menuData = [
  {
    title: "Dashboard",
    link: "/",
    icon: "grid_view",
    submenu: false,
  },
  {
    title: "Student",
    submenu: true,
    link: "/",
    icon: "badge",
    menuName: "studentItem",
  },
];

export const studentItem = [
  {
    title: "Student Detail",
    link: "/student-detail",
    icon: "info",
  },
  {
    title: "Addmission",
    link: "/student-addmission",
    icon: "add",
  },
  {
    title: "Cancel Addmission",
    link: "/student-addmission",
    icon: "delete_forever",
  },
  {
    title: "Filter",
    link: "/student-filter",
    icon: "filter_alt",
  },
  {
    title: "Performance",
    link: "/student-performance",
    icon: "align_vertical_bottom",
  },
];
