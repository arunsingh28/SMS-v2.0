export const menuData = [
  {
    title: "Dashboard",
    path: "/",
    icon: "grid_view",
    isOpen: "keyboard_arrow_up",
    isClose: "expand_more",
  },
  {
    title: "Student",
    submenu: true,
    path: "/",
    icon: "badge",
    isOpen: "keyboard_arrow_up",
    isClose: "expand_more",
    menuName: [
      {
        title: "Student Detail",
        path: "/student-detail",
        icon: "info",
      },
      {
        title: "Addmission",
        path: "/student-addmission",
        icon: "add",
      },
      {
        title: "Cancel Addmission",
        path: "/student-addmission",
        icon: "delete_forever",
      },
      {
        title: "Filter",
        path: "/student-filter",
        icon: "filter_alt",
      },
      {
        title: "Performance",
        path: "/student-performance",
        icon: "align_vertical_bottom",
      },
    ],
  },
];
