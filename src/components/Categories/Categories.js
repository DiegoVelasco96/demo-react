import React, { Component } from 'react';
import {
    Table,
    Button,
    Icon,
    Form,
    Input
} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../state/Categories/actions';

const FormItem = Form.Item;
const { Column } = Table;

class Categories extends Component {

    componentWillMount(){
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
                    <FormItem
                        label="Category">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input the Category!' }],
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit">
                            <Icon type="plus" /> Add category
                    </Button>
                    </FormItem>
                </Form>
                <Table dataSource={this.props.categories} >
                    <Column title="Name" dataIndex="name" key="name" />
                </Table>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        categories: state.categories.categories
    }
}

export default connect(mapStateToProps, actions)(Form.create()(Categories));