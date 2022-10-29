import { Component } from "react";
import "./app-header.scss";

/**
 * Top header of the application
 */
export default class AppHeader extends Component
{
    render()
    {
        return (
            <div className="app-header">
                <div className="app-header-logo">Michel</div>
            </div>
        );
    }
}