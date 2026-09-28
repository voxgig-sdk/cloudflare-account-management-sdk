# CloudflareAccountManagement SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CloudflareAccountManagementFeatures
  def self.make_feature(name)
    case name
    when "base"
      CloudflareAccountManagementBaseFeature.new
    when "test"
      CloudflareAccountManagementTestFeature.new
    else
      CloudflareAccountManagementBaseFeature.new
    end
  end
end
