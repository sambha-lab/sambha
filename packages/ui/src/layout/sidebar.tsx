"use client";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { userData } from "../../../../apps/web/app/[accessType]/chats/data";
import { Settings, SettingsGradient } from "../icons";
import { Sidebar } from "../sidebar";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type BaseSidebarItem = {
  icon: ReactNode;
  label: string;
};

type UrlSidebarItem = BaseSidebarItem & {
  url: string;
  onclick?: never;
};

type ActionSidebarItem = BaseSidebarItem & {
  url?: never;
  onclick: () => void;
};

type SidebarItem = UrlSidebarItem | ActionSidebarItem;

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

type IconProps = {
  active?: boolean;
  className?: string;
  // Add other props your icons might use
};

const SidebarItem = ({ icon, label, active, onClick }: SidebarItemProps) => (
  <button
    role="button"
    onClick={onClick}
    className={`
    flex items-center p-1 rounded-full cursor-pointer w-full gap-4
    ${active ? "bg-primary-light text-sidebar-primary" : "hover:bg-primary-light/10"}
  `}
  >
    <span className="bg-card h-10 w-10 flex items-center justify-center">
      {React.isValidElement<IconProps>(icon)
        ? React.cloneElement(icon, {
            ...icon.props,
            active,
            className: `${icon.props.className || ""} ${active ? "text-sidebar-primary" : ""}`,
          })
        : icon}
    </span>
    <span
      className={` ${active && " bg-gradientText bg-clip-text text-transparent"} text-sm font-medium text-primary-light`}
    >
      {label}
    </span>
  </button>
);

const SambhaSidebar = ({
  sidebarItems,
  role,
}: {
  sidebarItems: SidebarItem[];
  role: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<SidebarItem | undefined>(() =>
    sidebarItems?.find((item) => item.url === pathname)
  );
  // let role: string = "planner";

  const isSettingsActive = pathname.includes(`${role}/settings`);

  useEffect(() => {
    if (pathname) {
      setActiveItem(
        sidebarItems.find(
          (item) => "url" in item && item.url && pathname.includes(item.url)
        )
      );
    }
  }, [pathname, sidebarItems]);

  return (
    <Sidebar className="!bg-primary-darkPurple  overflow-hidden block w-full lg:w-[20.625rem]">
      <section className="flex flex-col text-sidebar-foreground md:rounded-xl shadow-[0px_0px_4px_0px_#0000001A] p-4  overflow-y-auto h-full md:h-[calc(100vh-70px)] no-scrollbar w-full">
        <div className="flex items-center mb-6 gap-3">
          <div>
            <h2 className="bg-gradientText bg-clip-text text-transparent font-semibold mt-2 text-4xl">
              Sambha
            </h2>
          </div>
        </div>

        <div className="space-y-2 mt-20">
          {sidebarItems.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              label={item.label}
              active={activeItem?.label === item.label}
              onClick={() => {
                setActiveItem(item);
                if ("url" in item && item.url) {
                  router.push(`/${role}/${item.url}`);
                }
              }}
            />
          ))}
        </div>
        <div className="flex-1" />
        <div>
          <div
            className={clsx(
              isSettingsActive
                ? "bg-primary-light text-sidebar-primary"
                : "hover:bg-primary-light/10",
              "flex items-center p-3 rounded-full cursor-pointer w-full gap-4"
            )}
            onClick={() => router.push(`/${role}/settings`)}
          >
            {isSettingsActive ? <SettingsGradient /> : <Settings />}

            <span
              className={clsx(
                isSettingsActive &&
                  "bg-gradientText bg-clip-text text-transparent",
                "text-sm font-medium text-primary-light"
              )}
            >
              Settings
            </span>
          </div>
          <div
            className="flex items-center justify-between mt-6 cursor-pointer"
            onClick={() => router.push(`/${role}/profile`)}
          >
            <div className="flex space-x-4 items-center text-white-base">
              <Image
                src={userData.image}
                alt={userData.name}
                width={30}
                height={30}
                className="size-9 rounded-full"
              />
              <div>
                <p className="font-bold text-white-base">{userData.name}</p>
                <p className="text-sm text-white-base">{userData.email}</p>
              </div>
            </div>
            <ChevronRight className="text-white-base cursor-pointer" />
          </div>
        </div>
      </section>
    </Sidebar>
  );
};

export default SambhaSidebar;
