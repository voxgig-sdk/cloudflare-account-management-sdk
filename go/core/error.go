package core

type CloudflareAccountManagementError struct {
	IsCloudflareAccountManagementError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCloudflareAccountManagementError(code string, msg string, ctx *Context) *CloudflareAccountManagementError {
	return &CloudflareAccountManagementError{
		IsCloudflareAccountManagementError: true,
		Sdk:              "CloudflareAccountManagement",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CloudflareAccountManagementError) Error() string {
	return e.Msg
}
