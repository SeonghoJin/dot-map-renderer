export interface PageProps {
    user?: {};
    onLogin: () => void;
    onLogout: () => void;
    onCreateAccount: () => void;
}

export const Page = ({ user, onLogin, onLogout, onCreateAccount }: PageProps) => {
    return <div></div>
}
