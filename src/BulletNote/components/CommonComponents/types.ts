import { Callback } from "common-types";

export interface NavBarProps {
  isOffline: boolean
  isDrawerOpen: boolean
  onToggleDrawer: Callback
}

export interface UserNotFoundPageProps {
  errorMessage: string
}