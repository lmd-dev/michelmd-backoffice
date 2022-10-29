import "./home-panel.scss"
import { Component, ReactNode } from "react";

/**
 * First panel displayed by the backoffice
 */
export class HomePanel extends Component
{
    render(): ReactNode {
        return (
            <div className="home-panel">
                <img src="/logo192.png" alt="Michel" />
            </div>
        )
    }
}