import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IconType } from "react-icons";

type MenuItemProps = {
    label: string;
    to: string;
    compact?: boolean;
    right?: string;
    Icon: IconType;
};


export function MenuItem({ label, to, Icon, compact = false, right }: MenuItemProps) {

    return (
        <li className="flex">
            <NavLink
                className={({ isActive }) =>
                    `${compact ? 'h-10 text-base' : 'h-14'} flex items-center gap-2 border-l-4 transition-all ${isActive ? "bg-gray-50 text-gray-800" : "text-gray-500 border-transparent"
                    } hover:bg-gray-50 px-3  w-full`
                }
                to={to}
            >
                <Icon />
                <span className="line-clamp-1 mr-auto">{label}</span>
                {!!right && (
                    <span className="text-sm px-1 py-1 text-primary-400  rounded-full">{right}</span>
                )}
            </NavLink>
        </li>
    );
}