import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default function Breadcrumbs() {
	const paths = location.pathname.split("/").filter((item) => item !== "");

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				{paths?.length ? <BreadcrumbSeparator /> : null}
				{paths.map((path, index) => {
					return (
						<>
							<BreadcrumbItem>
								<BreadcrumbLink
									className="capitalize"
									href={index ? paths.join("/") : `/${path}`}
								>
									{path}
								</BreadcrumbLink>
							</BreadcrumbItem>
							{paths?.length - 1 !== index ? <BreadcrumbSeparator /> : null}
						</>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
