export const editRoute = (defaultRoute: string, id: string) => {
    return defaultRoute.replace(":id", id);
};
