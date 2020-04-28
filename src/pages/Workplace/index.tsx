import { Avatar, Card, Col, List, Skeleton, Row, Statistic, Divider, Button } from 'antd';
import React, { Component } from 'react';
import { UnorderedListOutlined } from "@ant-design/icons";
import { Link, Dispatch, connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { ModalState } from './model';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { ActivitiesType, CurrentUser, NoticeType, RadarDataType } from './data.d';
import PieError from './components/PieError'
import BarMessage from './components/BarMessage';
import PieSendDay from './components/PieSendDay'
import { Gauge } from 'ant-design-pro/lib/Charts';


const links = [
  {
    title: '群发短信',
    href: '',
  },
  {
    title: '查看发送记录',
    href: '',
  },
  {
    title: '管理号码群组',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

interface WorkplaceProps {
  currentUser?: CurrentUser;
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  dispatch: Dispatch<any>;
  currentUserLoading: boolean;
  projectLoading: boolean;
  activitiesLoading: boolean;
}

const PageHeaderContent: React.FC<{ currentUser: CurrentUser }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          hi，{currentUser.name}
        </div>
        <div>
          <Link to="">点击充值</Link> <Divider type="vertical" /> <Link to="">查看计费单位</Link>
        </div>
      </div>
    </div>
  );
};

const ExtraContent: React.FC<{}> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="账户金额" value={126560} prefix="¥" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="昨日消费金额" value={12423} prefix="¥"/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="预期可消费天数" value={3.6} suffix="天"/>
    </div>
  </div>
);

class Workplace extends Component<WorkplaceProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'Workplace/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'Workplace/clear',
    });
  }

  renderActivities = (item: ActivitiesType) => {
    
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<span className={styles.event}>{item.title}</span>}
          description={<span className={styles.datetime}>{item.desc}</span>}
        />
      </List.Item>
    );
  };

  render() {
    const {
      currentUser,
      activities,
      projectNotice,
      projectLoading,
      activitiesLoading,
      radarData,
    } = this.props;

    if (!currentUser || !currentUser.userid) {
      return null;
    }
    return (
      <GridContent
        // content={<PageHeaderContent currentUser={currentUser} />}
        // extraContent={<ExtraContent />}
      >
        <Row gutter={24} style={{padding:24}}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Card
                    style={{ marginBottom: 24 }}
                    bordered={false}
                    title={"hi," + currentUser.name}
                    loading={radarData.length === 0}
                  >
                  <div className={styles.pageHeaderContent}>
                    <div className={styles.avatar}>
                      <Avatar size="large" src={currentUser.avatar} />
                    </div>
                    <div className={styles.content}>
                      {/* <div className={styles.contentTitle}>
                        hi，{currentUser.name}
                      </div> */}
                      <ExtraContent></ExtraContent>
                      <div>
                        <Link to="">点击充值</Link> <Divider type="vertical" /> <Link to="">查看计费单位</Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Card
                    style={{ marginBottom: 24 }}
                    bordered={false}
                    title="今日发送情况"
                    loading={radarData.length === 0}
                  >
                  <div className={styles.chart}>
                    <Gauge color="#9cabff" title="成功率" height={210} percent={87} />
                    {/* <PieSendDay hasLegend height={130} /> */}
                  </div>
                </Card>
              </Col>
            </Row>            
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="我的产品列表"
              bordered={false}
              extra={<Link to="/">查看所有子账号</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {projectNotice.map((item) => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  {item.member === 1 ? (
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={''}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      {item.status === 1 ? 
                        <Button size="small" type="primary">
                          查看子账户
                        </Button>
                        :
                        <Button size="small" type="primary" disabled >
                            激活产品
                          </Button>}
                    </div>
                  </Card>)
                  :(<Card
                      bodyStyle={{
                        padding: 0,
                        textAlign: "center",
                        fontSize: 16,
                      }}
                      bordered={false}
                    >
                      <Card.Meta
                        title={<div className={styles.cardTitle}></div>}
                        description="敬请期待"
                      />
                      <div className={styles.projectItemContent}></div>
                    </Card>
                    )}
                </Card.Grid>
              ))}
            </Card>
            
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            
            <Card
              style={{ marginBottom: 24 }}
              title="便捷操作导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
            </Card>
            <Card
              bodyStyle={{ marginBottom: 24 }}
              bordered={false}
              className={styles.activeCard}
              title="通知"
              loading={activitiesLoading}
            >
              <List<ActivitiesType>
                loading={activitiesLoading}
                renderItem={(item) => this.renderActivities(item)}
                dataSource={activities}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="短信发送量"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <BarMessage hasLegend height={294} />
              </div>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="失败原因分析"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <PieError hasLegend height={194} />
              </div>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default connect(
  ({
    Workplace: { currentUser, projectNotice, activities, radarData },
    loading,
  }: {
    Workplace: ModalState;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    currentUserLoading: loading.effects['Workplace/fetchUserCurrent'],
    projectLoading: loading.effects['Workplace/fetchProjectNotice'],
    activitiesLoading: loading.effects['Workplace/fetchActivitiesList'],
  }),
)(Workplace);
