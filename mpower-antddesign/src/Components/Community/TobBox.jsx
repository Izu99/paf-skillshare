import React from "react";
import { Tabs } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";

const { TabPane } = Tabs;

const TabBox = () => {
  const snap = useSnapshot(state);

  return (
    <Tabs
      activeKey={String(snap.activeIndex)}
      onChange={(key) => {
        state.activeIndex = Number(key);
      }}
      type="card"
      className="custom-tabs"
    >
      <TabPane tab="Feed" key="1" />
      <TabPane tab="Workout Plans" key="2" />
      <TabPane tab="Meal Plans" key="3" />
      <TabPane tab="Skill Plans" key="4" />
      <TabPane tab="Friends" key="5" />
      <TabPane tab="Notifications" key="6" />
    </Tabs>
  );
};

export default TabBox;
