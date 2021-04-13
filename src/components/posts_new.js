import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className=`form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    type="text" 
                    className="form-control"
                    {...field.input}
                 />
                 <div className="text-help">
                    {touched ? error : ""}
                 </div>
            </div>
        );
    }

    formSubmit(values) {
        this.props.createPost(values);
    }

    render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
                <Field 
                name="title"
                label="Title"
                component={this.renderField}
                />
                 <Field 
                name="categories"
                label="Categories"
                component={this.renderField}
                />
                 <Field 
                name="content"
                label="Post Content"
                component={this.renderField}
                />
                <button className="btn btn-primary margin-left-5">Submit</button>
                <Link className="btn btn-danger margin-left-5" to="/">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    //Validate the inputs from values
    if(!values.title) {
        errors.title = "Enter a title";
    }
    else if(values.title.length < 3) {
        errors.title = "Title should atleast 3 characters";
    }

    if(!values.categories) {
        errors.categories = "Enter some categories";
    }

    if(!values.content) {
        errors.content = "Enter some content";
    }

    // If the errors is empty, the form is fine to subit
    // If errors is not empty then redux form assumes that form is invalid
    return errors;
}

export default reduxForm({
    form: "PostsNewForm",
    validate
})(
    connect(null, { createPost })(PostsNew)
);