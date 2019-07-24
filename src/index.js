import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button } from "antd";

class PriceInput extends React.Component {
  static getDerivedStateFromProps(nextProps, prevSate) {
    if ("value" in nextProps) {
      console.log(nextProps.value);

      return Object.assign(
        {},
        {
          value: nextProps.value || null
          // fieldActive:nextProps.value.length>0?true:false
        },
        nextProps.value
          ? {
              fieldActive: nextProps.value.length > 0 ? true : false
            }
          : {}
      );
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || null,
      test: "",
      fieldActive: false
    };
  }

  componentDidMount() {
    let { value } = this.props;
    console.log(this.props, "ddd");
  }

  handleValueChange = e => {
    this.triggerChange(e.target.value);
    this.activateField(e);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  //Styling handler
  activateField = () => {
    this.setState({
      fieldActive: true
    });
  };
  // to deactivate input only if it's empty
  disableField = e => {
    if (e.target.value === "") {
      this.setState({
        fieldActive: false
      });
    }
  };

  render() {
    const { size } = this.props;
    const { state } = this;
    console.log(state);

    return (
      <div className="custom-input">
        <label className={this.state.fieldActive ? "field-active" : ""}>
          Name
        </label>
        <Input
          type="text"
          size={size}
          value={state.value}
          onChange={this.handleValueChange}
          onFocus={this.activateField}
          onBlur={this.disableField}
        />
      </div>
    );
  }
}

class Demo extends React.Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      price: "ddd"
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  // checkPrice = (rule, value, callback) => {
  //   if (value.number > 0) {
  //     callback();
  //     return;
  //   }
  //   callback('Price must greater than zero!');
  // };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("price", {
            rules: [
              /* { validator: this.checkPrice } */
            ]
          })(<PriceInput />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: "customized_form_controls" })(Demo);

ReactDOM.render(<WrappedDemo />, document.getElementById("container"));
