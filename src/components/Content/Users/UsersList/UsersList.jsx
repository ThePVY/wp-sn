import User from "./User/User";
import styles from "./UsersList.module.css";
import React from "react";
import PagesList from "./PagesList/PagesList";

const UsersList = ({
  usersList,
  pagesCount,
  selectedPage,
  isFetching,
  loadings,
  onFollowClick,
  onPageClick,
  resetForm,
}) => {
  const pageListProps = {
    onPageClick,
    pagesCount,
    selectedPage,
    isFetching,
    resetForm,
  };
  const userProps = { onFollowClick, loadings };

  return (
    <div className={styles.usersList}>
      <PagesList {...pageListProps} />
      {usersList.map((user) => (
        <User key={user.id} user={user} {...userProps} />
      ))}
      <PagesList {...pageListProps} />
    </div>
  );
};

export default UsersList;
