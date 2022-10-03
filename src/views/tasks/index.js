import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  addTasks,
  deleteTasks,
  getTasks,
  patchTasks,
  updateTasks,
} from "../../store/slices/tasks/taskSlice";
import {
  Divider,
  Button,
  Table,
  Modal,
  Form,
  Tooltip,
  Input,
  Space,
  message,
  Popconfirm,
  Descriptions
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { messages } from "../../translations/messages";
import { diff } from "../../helpers/index";

const Tasks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const taskState = useSelector((state) => state.tasks);

  const intl = useIntl();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  const add = () => {
    form.resetFields();
    setEditMode(false);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editMode) {
          var oldObject = taskState.tasks.data.filter(
            (x) => x.id === values.id
          )[0];
          let newObject = {
            id: values.id,
            taskname: values.taskname,
          };
          var objectSize = Object.keys(oldObject).length - 1;

          let request = diff(oldObject, newObject);
          request.id = values.id;
          var requestSize = Object.keys(request).length - 1;
        console.log("requestSize",requestSize)
        console.log("objectSize",objectSize)

            if (requestSize === objectSize) {
            console.log("update")
            dispatch(updateTasks(newObject))
              .unwrap()
              .then((result) => {
                dispatch(getTasks());
                setIsModalVisible(false);
                form.resetFields();
                message.success(intl.formatMessage(messages.TASK_UPDATED));
              });
          }else{
            console.log("patch")
            dispatch(patchTasks(request))
            .unwrap()
            .then((result) => {
              dispatch(getTasks());
              setIsModalVisible(false);
              form.resetFields();
              message.success(intl.formatMessage(messages.TASK_UPDATED));
            });
          }
        } else {
          let body = {
            taskname: values.taskname,
          };
          dispatch(addTasks(body))
            .unwrap()
            .then((result) => {
              dispatch(getTasks());
              setIsModalVisible(false);
              form.resetFields();
              message.success(intl.formatMessage(messages.TASK_ADDED));
            });
        }
      })
      .catch((info) => {});
  };

  const handleDelete = (id) => {
    dispatch(deleteTasks(id))
      .unwrap()
      .then((result) => {
        dispatch(getTasks());
        message.success(intl.formatMessage(messages.TASK_DELETED));
      });
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      taskname: record.taskname,
      id: record.id,
    });
    setEditMode(true);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button
        onClick={() => add()}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        {intl.formatMessage(messages.ADD)}
      </Button>
      <Divider />
      <Table
        dataSource={taskState.tasks.data}
        loading={taskState.loading}
        rowKey="id"
        columns={[
          {
            title: intl.formatMessage(messages.TASK_NAME),
            dataIndex: "taskname",
            key: "taskname",
            defaultSortOrder: "descend",
          },
          {
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Tooltip title={intl.formatMessage(messages.UPDATE)}>
                  <Button
                    onClick={() => handleEdit(record)}
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                  />
                </Tooltip>
                <Popconfirm
                  title={intl.formatMessage(
                    messages.ARE_YOU_SURE_YOU_WANT_TO_DELETE_TASK
                  )}
                  onConfirm={() => handleDelete(record.id)}
                  okText={intl.formatMessage(messages.YES)}
                  cancelText={intl.formatMessage(messages.NO)}
                >
                  <Tooltip title={intl.formatMessage(messages.DELETE)}>
                    <Button
                      type="primary"
                      danger
                      shape="circle"
                      icon={<DeleteOutlined />}
                    />
                  </Tooltip>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={
          editMode
            ? intl.formatMessage(messages.UPDATE)
            : intl.formatMessage(messages.ADD)
        }
        onCancel={handleCancel}
        visible={isModalVisible}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {intl.formatMessage(messages.CANCEL)}
          </Button>,
          <Button key="submit" type="primary" 
          onClick={handleOk}
          >
            {intl.formatMessage(messages.SAVE)}
          </Button>,
        ]}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 6,
          }}
          initialValues={{ remember: true }}
          autoComplete="on"
        >
          <Form.Item hidden={true} name="id">
            <Input />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage(messages.TASK_NAME)}
            name="taskname"
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  messages.TASK_NAME_CAN_NOT_BE_BLANK
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Tasks;
