import styles from './breadCrumbs.module.css';

interface IBreadCrumbsProps {
  breadCrumbs: string[];
}

export default function BreadCrumbs({ breadCrumbs }: IBreadCrumbsProps) {
  const renderLink = (crumb: string) => {
    switch (crumb) {
      case 'Home':
        return <a href="/">{crumb}</a>;
      case 'Themen':
        return <a href="/#sectionTheme">{crumb}</a>;
      case 'Verben':
        return <a href="/verbs">{crumb}</a>;
      default:
        return <a href="#">{crumb}</a>;
    }
  };
  return (
    <>
      {breadCrumbs.map((crumb, index) => (
        <div key={index} className={styles.breadCrumbs}>
          {index !== 0 && <span>/ </span>}
          {renderLink(crumb)}
        </div>
      ))}
    </>
  );
}
