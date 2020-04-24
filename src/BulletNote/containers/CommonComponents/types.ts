import { NavBarProps } from "BulletNote/components/CommonComponents/types";

export interface NavBarContainerProps extends Omit<NavBarProps, 'isDrawerOpen' | 'onToggleDrawer'> {
  
}