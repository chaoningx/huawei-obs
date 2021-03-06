exports.errorCode = {
  "AccessDenied":{ cn: "拒绝访问。", httpMessage: "403 Forbidden" },
  "AccessForbidden":{ cn: "权限不足。", httpMessage: "403 Forbidden" },
  "AccountProblem":{ cn: "用户的账户出现异常（过期、冻结等），不能成功地完成操作。", httpMessage: "403 Forbidden" },
  "AllAccessDisabled":{ cn: "用户无权限执行某操作。", httpMessage: "403 Forbidden" },
  "AmbiguousGrantByEmailAddress":{ cn: "用户提供的Email地址关联的账户超过了1个。", httpMessage: "400 Bad Request" },
  "BadDigest":{ cn: "客户端指定的对象内容的MD5值与系统接收到的内容MD5值不一致。", httpMessage: "400 Bad Request" },
  "BadDomainName":{ cn: "域名不合法。", httpMessage: "400 Bad Request" },
  "BadRequest":{ cn: "请求参数不合法。", httpMessage: "400 Bad Request" },
  "BucketAlreadyExists":{ cn: "请求的桶名已经存在。桶的命名空间是系统中所有用户共用的，选择一个不同的桶名再重试一次。", httpMessage: "409 Conflict" },
  "BucketAlreadyOwnedByYou":{ cn: "发起该请求的用户已经创建过了这个名字的桶，并拥有这个桶。", httpMessage: "409 Conflict" },
  "BucketNotEmpty":{ cn: "用户尝试删除的桶不为空。", httpMessage: "409 Conflict" },
  "CredentialsNotSupported":{ cn: "该请求不支持证书验证。", httpMessage: "400 Bad Request" },
  "CustomDomainAreadyExist":{ cn: "配置了已存在的域。", httpMessage: "400 Bad Request" },
  "CustomDomainNotExist":{ cn: "操作的域不存在。", httpMessage: "400 Bad Request" },
  "DeregisterUserId":{ cn: "用户已经注销。", httpMessage: "403 Forbidden" },
  "EntityTooSmall":{ cn: "用户试图上传的对象大小小于系统允许的最小大小。", httpMessage: "400 Bad Request" },
  "EntityTooLarge":{ cn: "用户试图上传的对象大小超过了系统允许的最大大小。", httpMessage: "400 Bad Request" },
  "FrozenUserId":{ cn: "用户被冻结。", httpMessage: "403 Forbidden" },
  "IllegalVersioningConfiguration Exception":{ cn: "请求中的版本配置无效。", httpMessage: "400 Bad Request" },
  "IllegalLocationConstraintException":{ cn: "配置了与所在Region不匹配的区域限制。", httpMessage: "400 Bad Request" },
  "InArrearOrInsufficientBalance":{ cn: "用户欠费或余额不足而没有权限进行某种操作。", httpMessage: "403 Forbidden" },
  "IncompleteBody":{ cn: "请求体不完整。", httpMessage: "400 Bad Request" },
  "IncorrectNumberOfFilesInPost Request":{ cn: "每个POST请求都需要带一个上传的文件。", httpMessage: "400 Bad Request" },
  "InlineDataTooLarge":{ cn: "Inline Data超过了允许的最大长度。", httpMessage: "400 Bad Request" },
  "InsufficientStorageSpace":{ cn: "存储空间不足。", httpMessage: "403 Forbidden" },
  "InternalError":{ cn: "系统遇到内部错误，请重试。", httpMessage: "500 Internal Server Error" },
  "InvalidAccessKeyId":{ cn: "系统记录中不存在客户提供的Access Key Id。", httpMessage: "403 Forbidden" },
  "InvalidAddressingHeader":{ cn: "用户必须指定匿名角色。", httpMessage: "N/A" },
  "InvalidArgument":{ cn: "无效的参数。", httpMessage: "400 Bad Request" },
  "InvalidBucketName":{ cn: "请求中指定的桶名无效。", httpMessage: "400 Bad Request" },
  "InvalidBucket":{ cn: "请求访问的桶已不存在。", httpMessage: "400 Bad Request" },
  "InvalidBucketState":{ cn: "无效的桶状态。", httpMessage: "409 Conflict" },
  "InvalidBucketStoragePolicy":{ cn: "修改桶策略时，提供的新策略不合法。", httpMessage: "400 Bad Request" },
  "InvalidDigest":{ cn: "HTTP头中指定的Content-MD5值无效。", httpMessage: "400 Bad Request" },
  "InvalidEncryptionAlgorithmError":{ cn: "错误的加密算法。", httpMessage: "400 Bad Request" },
  "InvalidLocationConstraint":{ cn: "创建桶时，指定的location不合法。", httpMessage: "400 Bad Request" },
  "InvalidPart":{ cn: "一个或多个指定的段无法找到。这些段可能没有上传，或者指定的entity tag与段的entity tag不一致。", httpMessage: "400 Bad Request" },
  "InvalidPartOrder":{ cn: "段列表的顺序不是升序，段列表必须按段号升序排列。", httpMessage: "400 Bad Request" },
  "InvalidPayer":{ cn: "所有对这个对象的访问已经无效了。", httpMessage: "403 Forbidden" },
  "InvalidPolicyDocument":{ cn: "表单中的内容与策略文档中指定的条件不一致。", httpMessage: "400 Bad Request" },
  "InvalidRange":{ cn: "请求的range不可获得。", httpMessage: "416 Client Requested Range Not Satisfiable" },
  "InvalidRedirectLocation":{ cn: "无效的重定向地址。", httpMessage: "400 Bad Request" },
  "InvalidRequest":{ cn: "无效请求。", httpMessage: "400 Bad Request" },
  "InvalidRequestBody":{ cn: "POST请求体无效。", httpMessage: "400 Bad Request" },
  "InvalidSecurity":{ cn: "提供的安全证书无效。", httpMessage: "403 Forbidden" },
  "InvalidStorageClass":{ cn: "用户指定的Storage Class无效。", httpMessage: "400 Bad Request" },
  "InvalidTargetBucketForLogging":{ cn: "delivery group对目标桶无ACL权限。", httpMessage: "400 Bad Request" },
  "InvalidURI":{ cn: "无法解析指定的URI。", httpMessage: "400 Bad Request" },
  "KeyTooLong":{ cn: "提供的Key过长。", httpMessage: "400 Bad Request" },
  "MalformedACLError":{ cn: "提供的XML格式错误，或者不符合我们要求的格式。", httpMessage: "400 Bad Request" },
  "MalformedError":{ cn: "请求中携带的XML格式不正确。", httpMessage: "400 Bad Request" },
  "MalformedLoggingStatus":{ cn: "Logging的XML格式不正确。", httpMessage: "400 Bad Request" },
  "MalformedPolicy":{ cn: "Bucket policy检查不通过。", httpMessage: "400 Bad Request" },
  "MalformedPOSTRequest":{ cn: "POST请求的请求体不是结构化良好的多段或形式化数据。", httpMessage: "400 Bad Request" },
  "MalformedQuotaError":{ cn: "Quota的XML格式不正确。", httpMessage: "400 Bad Request" },
  "MalformedXML":{ cn: "当用户发送了一个配置项的错误格式的XML会出现这样的错误。", httpMessage: "400 Bad Request" },
  "MaxMessageLengthExceeded":{ cn: "请求消息过长。", httpMessage: "400 Bad Request" },
  "MaxPostPreDataLengthExceeded Error":{ cn: "在上传文件前面的POST请求域过大。", httpMessage: "400 Bad Request" },
  "MetadataTooLarge":{ cn: "元数据消息头超过了允许的最大元数据大小。", httpMessage: "400 Bad Request" },
  "MethodNotAllowed":{ cn: "指定的方法不允许操作在请求的资源上。", httpMessage: "405 Method Not Allowed" },
  "MissingContentLength":{ cn: "必须要提供HTTP消息头中的Content-Length字段。", httpMessage: "411 Length Required" },
  "MissingRegion":{ cn: "请求中缺少Region信息，且系统无默认Region。", httpMessage: "400 Bad Request" },
  "MissingRequestBodyError":{ cn: "当用户发送一个空的XML文档作为请求时会发生。", httpMessage: "400 Bad Request" },
  "MissingRequiredHeader":{ cn: "请求中缺少必要的头域。", httpMessage: "400 Bad Request" },
  "MissingSecurityHeader":{ cn: "请求缺少一个必须的头。", httpMessage: "400 Bad Request" },
  "NoSuchBucket":{ cn: "指定的桶不存在。", httpMessage: "404 Not Found" },
  "NoSuchBucketPolicy":{ cn: "桶policy不存在。", httpMessage: "404 Not Found" },
  "NoSuchCORSConfiguration":{ cn: "CORS配置不存在。", httpMessage: "404 Not Found" },
  "NoSuchCustomDomain":{ cn: "请求的用户域不存在。", httpMessage: "404 Not Found" },
  "NoSuchKey":{ cn: "指定的Key不存在。", httpMessage: "404 Not Found" },
  "NoSuchLifecycleConfiguration":{ cn: "请求的LifeCycle不存在。", httpMessage: "404 Not Found" },
  "NoSuchPolicy":{ cn: "给定的policy名字不存在。", httpMessage: "404 Not Found" },
  "NoSuchUpload":{ cn: "指定的多段上传不存在。Upload ID不存在，或者多段上传已经终止或完成。", httpMessage: "404 Not Found" },
  "NoSuchVersion":{ cn: "请求中指定的version ID与现存的所有版本都不匹配。", httpMessage: "404 Not Found" },
  "NoSuchWebsiteConfiguration":{ cn: "请求的Website不存在。", httpMessage: "404 Not Found" },
  "NotImplemented":{ cn: "用户提供的消息头功能上还没有实现。", httpMessage: "501 Not Implemented" },
  "NotSignedUp":{ cn: "你的帐户还没有在系统中注册，必须先在系统中注册了才能使用该帐户。", httpMessage: "403 Forbidden" },
  "OperationAborted":{ cn: "另外一个冲突的操作当前正作用在这个资源上，请重试。", httpMessage: "409 Conflict" },
  "PermanentRedirect":{ cn: "尝试访问的桶必须使用指定的结点，请将以后的请求发送到这个结点。", httpMessage: "301 Moved Permanently" },
  "PreconditionFailed":{ cn: "用户指定的先决条件中至少有一项没有包含。", httpMessage: "412 Precondition Failed" },
  "Redirect":{ cn: "临时重定向。", httpMessage: "307 Moved Temporarily" },
  "RequestIsNotMultiPartContent":{ cn: "桶POST必须是闭式的多段/表单数据。", httpMessage: "400 Bad Request" },
  "RequestTimeout":{ cn: "用户与Server之间的socket连接在超时时间内没有进行读写操作。", httpMessage: "400 Bad Request" },
  "RequestTimeTooSkewed":{ cn: "请求的时间与服务器的时间相差太大。", httpMessage: "403 Forbidden" },
  "RequestTorrentOfBucketError":{ cn: "不允许请求桶的torrent文件。", httpMessage: "400 Bad Request" },
  "ServiceNotImplemented":{ cn: "请求的方法服务端没有实现。", httpMessage: "501 Not Implemented" },
  "ServiceNotSupported":{ cn: "请求的方法服务端不支持。", httpMessage: "409 Conflict" },
  "ServiceUnavailable":{ cn: "服务器过载或者内部错误异常。", httpMessage: "503 Service Unavailable" },
  "SignatureDoesNotMatch":{ cn: "请求中带的签名与系统计算得到的签名不一致。检查你的Secret Access Key 和签名计算方法。", httpMessage: "403 Forbidden" },
  "SlowDown":{ cn: "请降低请求频率。", httpMessage: "503 Service Unavailable" },
  "System Capacity Not enough":{ cn: "系统空间不足异常 。", httpMessage: "403 Forbidden" },
  "TooManyCustomDomains":{ cn: "配置了过多的用户域", httpMessage: "400 Bad Request" },
  "TemporaryRedirect":{ cn: "当DNS更新时，请求将被重定向到桶。", httpMessage: "307 Moved Temporarily" },
  "TooManyBuckets":{ cn: "用户拥有的桶的数量达到了系统的上限，并且请求试图创建一个新桶。", httpMessage: "400 Bad Request" },
  "TooManyObjectCopied":{ cn: "用户单个对象被拷贝的数量超过系统上限。", httpMessage: "400 Bad Request" },
  "TooManyWrongSignature":{ cn: "因高频错误请求被拒绝服务。", httpMessage: "400 Bad Request" },
  "Unauthorized":{ cn: "用户未实名认证。", httpMessage: "403 Forbidden" },
  "UnexpectedContent":{ cn: "该请求不支持带内容字段。", httpMessage: "400 Bad Request" },
  "UnresolvableGrantByEmailAddress":{ cn: "用户提供的Email与记录中任何帐户的都不匹配。", httpMessage: "400 Bad Request" },
  "UserKeyMustBeSpecified":{ cn: "请求中缺少用户的AK信息。", httpMessage: "400 Bad Request" },
  "WebsiteRedirect":{ cn: "Website请求缺少bucketName。", httpMessage: "301 Moved Permanently" },
  "KMS.DisabledException":{ cn: "SSE-KMS加密方式下，主密钥被禁用。", httpMessage: "400 Bad Request" },
  "KMS.NotFoundException":{ cn: "SSE-KMS加密方式下，主密钥不存在。", httpMessage: "400 Bad Request" }
};