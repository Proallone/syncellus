import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface ModuleTileProps {
    title: string;
    description: string;
    onClick: () => void;
    Icon: React.ElementType;
}

export function ModuleTile({ title, description, onClick, Icon }: ModuleTileProps) {
    return (
        <Card onClick={onClick} className="hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-pointer">
            <CardHeader>
                <CardTitle>
                    {title} <Icon className="h-10 w-10" />{" "}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    );
}
