import React from "react";
import { Menu as AntMenu, Dropdown, Button } from "antd";
import Proptype from "prop-types";
import { Icon } from "components";
import theme from "config/theme";
import { useCurrentBreakpoint } from "util/screen";

export const findMenuByKey = (key, menus) => {
  const search = menus.filter((menu) => menu.key === key);
  return search.length > 0 ? search[0] : {};
};

export const findMenuByPath = (path, menus) => {
  const search = menus.filter((menu) => menu.path === path);
  return search.length > 0 ? search[0] : menus[0];
};

const SmallMenu = ({ onClick, menuOptions, menus }) => {
  const menu = (
    <NormalMenu
      onClick={onClick}
      menuOptions={{
        ...menuOptions,
        mode: "vertical",
      }}
      menus={menus}
    />
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]} arrow>
      <Button
        style={{ marginTop: 10 }}
        type="link"
        icon={<Icon name="MenuOutlined" color="#fff" />}
      />
    </Dropdown>
  );
};

const NormalMenu = ({ onClick, menuOptions, menus }) => (
  <AntMenu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={["1"]}
    {...menuOptions}
    onClick={onClick}
  >
    {menus
      .filter((item) => !!item.label)
      .map((menu, i) => (
        <AntMenu.Item key={menu.key}>
          {menu.icon && <Icon name={menu.icon} color={theme.colors.light} />}
          <span>{menu.label}</span>
        </AntMenu.Item>
      ))}
  </AntMenu>
);

const Menu = ({ menuOptions, onClickMenu, menus }) => {
  const breakpoint = useCurrentBreakpoint();

  const _clickMenu = (item) => {
    const _item = findMenuByKey(item.key, menus);
    onClickMenu && onClickMenu({ ...item, ..._item });
  };

  const isSmallScreen = ["xs"].includes(breakpoint);
  return (
    <>
      {!!isSmallScreen && (
        <SmallMenu
          onClick={_clickMenu}
          menuOptions={menuOptions}
          menus={menus}
        />
      )}
      {!isSmallScreen && (
        <NormalMenu
          onClick={_clickMenu}
          menuOptions={menuOptions}
          menus={menus}
        />
      )}
    </>
  );
};

Menu.propTypes = {
  menus: Proptype.arrayOf(
    Proptype.shape({
      key: Proptype.string.isRequired,
      path: Proptype.string.isRequired,
      icon: Proptype.string,
      label: Proptype.string,
    })
  ).isRequired,
};

Menu.defaultProps = {
  menuOptions: {},
  onClickMenu: () => {},
};

export { Menu };
