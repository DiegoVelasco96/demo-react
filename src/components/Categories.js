import React, { Component } from 'react';
import {
    Table,
    Button,
    Icon,
    Form,
    Input
} from 'antd';
import store from '../store';
import { connect } from 'react-redux';
import { saveDocument, loadCategories } from '../actionCreators';

const FormItem = Form.Item;
const { Column } = Table;

class Categories extends Component {

    componentWillMount(){
        store.dispatch(loadCategories());
    }

    saveCategory = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.form.resetFields();
                this.props.saveCategory(values, "frCategory");
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

const mapDispatchToProps = dispatch => {
    return {
        saveCategory(category, form) {
            dispatch(saveDocument(category, form))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Categories));