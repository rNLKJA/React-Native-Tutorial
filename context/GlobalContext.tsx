// @ts-nocheck
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { Models } from "appwrite";
import { getCurrentUser } from "../lib/appwrite";

interface GlobalContextType {
	isLogged: boolean;
	setIsLogged: (value: boolean) => void;
	user: Models.User | null;
	setUser: (user: Models.User | null) => void;
	loading: boolean;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
	children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [user, setUser] = useState<Models.User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getCurrentUser()
			.then((res: Models.User | null) => {
				if (res) {
					setIsLogged(true);
					setUser(res);
				} else {
					setIsLogged(false);
					setUser(null);
				}
			})
			.catch((error: Error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return (
		<GlobalContext.Provider
			value={{ isLogged, setIsLogged, user, setUser, loading }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
