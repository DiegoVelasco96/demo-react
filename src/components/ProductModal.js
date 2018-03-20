import React, { Component } from 'react';
import {
    Modal,
    Button,
    Form,
    Input,
    InputNumber,
    message
} from 'antd';
import { connect } from 'react-redux';
import { hideModal, saveProduct } from '../actionCreators';

const FormItem = Form.Item;

class ProductModal extends Component {
    hideModal = () => {
        this.props.form.resetFields();
        const product = {
            id: "",
            category: "",
            name: "",
            price: 0,
            image: "",
        }
        this.props.hideModal(false, "", product);
    }

    saveProduct = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { productsCategory } = this.props;
                const newProductsCategory = [...productsCategory];
                const operation = this.props.operation === "add" ? "saved" : "modified";

                newProductsCategory.forEach(function (element) {
                    if (element.category === values.category) {
                        if (operation === "saved") {
                            element.products.push(values);
                        } else {
                            element.products.forEach(function (item) {
                                if (item.id === values.id) {
                                    item.id = values.id;
                                    item.category = values.category;
                                    item.name = values.name;
                                    item.price = values.price;
                                    item.image = values.image;
                                }
                            });
                        }
                    }
                });

                this.props.form.resetFields();
                this.props.saveProduct(false, newProductsCategory);

                message.success('The product has been ' + operation + ' successfully');
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onCancel={this.hideModal}
                footer={[
                    <Button key="back" size="large" onClick={this.hideModal}>Close</Button>,
                ]}>

                <Form onSubmit={this.saveProduct}>
                    <FormItem
                        label="Code"
                        extra={this.props.display === "none" ? this.props.product.id : ""}>
                        {getFieldDecorator('id', {
                            initialValue: this.props.product.id,
                            rules: [{ required: true, message: 'Please input the code!' }],
                        })(
                            <Input type="text" disabled={true} style={{ display: this.props.display }} />
                            )}
                    </FormItem>
                    <FormItem
                        label="Category"
                        extra={this.props.display === "none" ? this.props.product.category : ""}>
                        {getFieldDecorator('category', {
                            initialValue: this.props.product.category,
                            rules: [{ required: true, message: 'Please input the category!' }],
                        })(
                            <Input type="text" disabled={true} style={{ display: this.props.display }} />
                            )}
                    </FormItem>
                    <FormItem
                        label="Name"
                        extra={this.props.display === "none" ? this.props.product.name : ""}>
                        {getFieldDecorator('name', {
                            initialValue: this.props.product.name,
                            rules: [{ required: true, message: 'Please input the name!' }],
                        })(
                            <Input type="text" style={{ display: this.props.display }} />
                            )}
                    </FormItem>
                    <FormItem
                        label="Price"
                        extra={this.props.display === "none" ? this.props.product.price : ""}>
                        {getFieldDecorator('price', {
                            initialValue: this.props.product.price,
                            rules: [{ required: true, message: 'Please input the price!' }],
                        })(
                            <InputNumber
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')} style={{ display: this.props.display }} />
                            )}
                    </FormItem>
                    <FormItem
                        label="Route image"
                        style={{ display: this.props.display }}>
                        {getFieldDecorator('image', {
                            initialValue: this.props.product.image,
                            rules: [{ required: true, message: 'Please input the route image!' }],
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ display: this.props.display }}>
                            Save
                            </Button>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.products.title,
        visible: state.products.visible,
        product: state.products.product,
        display: state.products.display,
        operation: state.products.operation,
        productsCategory: state.products.productsCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideModal(visible, display, product) {
            dispatch(hideModal(visible, display, product))
        },
        saveProduct(visible, productsCategory) {
            dispatch(saveProduct(visible, productsCategory))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProductModal))