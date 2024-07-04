import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from 'react'
type CrumbsProps = {
  href?: string;
  name: string;
}

type Props = {
  crumbs : CrumbsProps[]
}

const BreadCrumbComponent = ({ crumbs }: Props) => {
  return (
    <Breadcrumb
      className="absolute top-5 left-5"
    >
      <BreadcrumbList className="md:text-md hidden md:flex">
        {crumbs.map((crumb, index) => (
          <Fragment key={index}>

            <BreadcrumbItem>
              {crumbs.length - 1 === index ? (
                <BreadcrumbPage> {crumb.name} </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href} 
                  className='hover:underline'
                >
                  {crumb.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {crumbs.length - 1 !== index && <BreadcrumbSeparator/>}

          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumbComponent