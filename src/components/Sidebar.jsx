import React from "react";

const Sidebar = () => {
  const sidebarSections = [
    {
      title: "ORDERS",
      links: [{ to: "/orders-returns", label: "Orders & Returns" }],
    },
    {
      title: "CREDITS",
      links: [
        { to: "/coupons", label: "Coupons" },
        { to: "/mintra-credit", label: "Mintra Credit" },
        { to: "/mincash", label: "MinCash" },
      ],
    },
    {
      title: "ACCOUNT",
      links: [
        { to: "/profile", label: "Profile" },
        { to: "/saved-cards", label: "Saved Cards" },
        { to: "/saved-upi", label: "Saved UPI" },
        { to: "/addresses", label: "Addresses" },
        { to: "/delete-account", label: "Delete Account" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { to: "/terms-of-use", label: "Terms of Use" },
        { to: "/privacy-policy", label: "Privacy Policy" },
      ],
    },
  ];

  return (
    <div className="hidden lg:block lg:w-1/4 lg:text-sm text-gray-500 mt-5 h-2 space-y-5 rounded-lg mb-5 lg:mb-0">
      {sidebarSections.map((section, index) => (
        <div key={index} className="space-y-2">
          <p className="text-xs text-gray-400">{section.title}</p>
          {section.links.map((link, linkIndex) => (
            <a
              key={linkIndex}
              href={link.to}
              className="block py-1 px-3 rounded-md hover:bg-gray-200"
            >
              {link.label}
            </a>
          ))}
          <div className="w-full h-px bg-gray-300 mb-5"></div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
