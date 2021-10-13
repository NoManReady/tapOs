export default [
	{
		path: 'admin',
		label: 'TapOs管理系统',
		compPath: 'Admin',
		children: [
			{
				path: 'overview',
				label: '状态',
				icon: 'tapos-project',
				children: [
					{
						path: 'sysStatus',
						label: '系统状态',
						compPath: 'overview/SysStatus',
					},
					{
						path: 'portStatus',
						label: '端口状态',
						compPath: 'overview/PortStatus',
					},
					{
						path: 'portStatistics',
						label: '系统统计',
						compPath: 'overview/PortStatistics',
					},
				],
			},
			{
				path: 'config',
				label: '配置',
				icon: 'tapos-basicsettings',
				children: [
					{
						path: 'portSetting',
						label: '端口配置',
						compPath: 'config/PortSetting',
					},
					{
						path: 'inputSetting',
						label: '输入端口组配置',
						compPath: 'config/InputSetting',
					},
					{
						path: 'outputSetting',
						label: '输出端口组配置',
						compPath: 'config/OutputSetting',
					},
					{
						path: 'outputGrpSetting',
						label: '输出端口组配置//',
						compPath: 'config/OutputGrpSetting',
					},
					{
						path: 'acl',
						label: 'ACL配置',
						compPath: 'config/AclSetting',
					},
				],
			},
			{
				path: 'diagnose',
				label: '信息中心&排障',
				icon: 'tapos-diagnosis',
				children: [
					{
						path: 'netTool',
						label: '网络工具',
						compPath: 'diagnose/NetTool',
					},
					{
						path: 'syslog',
						label: '系统日志',
						compPath: 'diagnose/Syslog',
					},
				],
			},
			{
				path: 'system',
				label: '系统设置',
				icon: 'tapos-systemset',
				children: [
					{
						path: 'systime',
						label: '系统时间',
						compPath: 'system/SysTime',
					},
					{
						path: 'managerIp',
						label: '管理Ip',
						compPath: 'system/ManagerIp',
					},
					{
						path: 'user',
						label: '用户管理',
						compPath: 'system/User',
					},
					{
						path: 'recover',
						label: '配置管理',
						compPath: 'system/Recover',
					},
					{
						path: 'upgrade',
						label: '系统升级',
						compPath: 'system/Upgrade',
					},
					{
						path: 'reboot',
						label: '设备重启',
						compPath: 'system/Reboot',
					},
				],
			},
		],
	},
]
