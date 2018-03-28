import React, { Component } from 'react';
import {
    Table,
    Button,
    Icon,
    Form,
    Input,
    Popconfirm,
} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../state/Categories/actions';

const FormItem = Form.Item;
const { Column } = Table;

class Categories extends Component {

    componentWillMount() {
        this.props.loadCategories();
    }

    saveCategory = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.form.resetFields();
                this.props.saveCategory(values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form layout="inline" style={{ margin: '10px' }} onSubmit={this.saveCategory}>
                    <FormItem>
                        {getFieldDecorator('id', {
                            initialValue: this.props.id,
                        })(
                            <Input type="text" disabled={true} style={{ display: 'none' }} />
                        )}
                    </FormItem>
                    <FormItem
                        label="Category">
                        {getFieldDecorator('name', {
                            initialValue: this.props.name,
                            rules: [{ required: true, message: 'Please input the Category!' }],
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon="plus"> Add category
                        </Button>
                    </FormItem>
                </Form>
                <Table dataSource={this.props.categories} >
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(text, record) => (
                            <div>
                                <Icon
                                    type="edit"
                                    title="Modify"
                                    onClick={() => this.props.modifyCategory(record)}
                                    style={{ marginRight: '10px' }} />
                                <Popconfirm
                                    title="Are you sure delete this category?"
                                    onConfirm={() =>
                                        this.props.deleteDocument(record.id)
                                    }
                                    okText="Yes" cancelText="No">
                                    <Icon type="delete" title="Delete" />
                                </Popconfirm>
                            </div>
                        )} />
                </Table>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
        id: state.categories.id,
        name: state.categories.name,
    }
}

export default connect(mapStateToProps, actions)(Form.create()(Categories));