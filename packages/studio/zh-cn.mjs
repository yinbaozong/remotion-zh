// Remotion Studio 简体中文汉化脚本
// 用法：node scripts/zh-cn.mjs [目标目录]
// 默认汉化 node_modules/@remotion/studio/dist；也可指向 Remotion 源码的 packages/studio/src
import fs from 'node:fs';
import path from 'node:path';

export const dict = {
	// 顶部菜单
	'File': '文件', 'View': '视图', 'Tools': '工具', 'Help': '帮助', 'Edit': '编辑',
	'Remotion': 'Remotion', 'Settings': '设置', 'Settings...': '设置...',
	'About Remotion': '关于 Remotion', 'Help: About Remotion': '帮助：关于 Remotion',
	'Acknowledgements': '致谢', 'Help: Acknowledgements': '帮助：致谢',
	'Changelog': '更新日志', 'Help: Changelog': '帮助：更新日志',
	'Docs': '文档', 'Visit Documentation': '查看文档', 'File an issue': '提交问题', 'File GitHub issue': '在 GitHub 提交问题',
	'Join Discord community': '加入 Discord 社区', 'Keyboard shortcuts': '键盘快捷键',
	'Restart Studio': '重启 Studio', 'Restart Studio Server': '重启 Studio 服务',
	'Shut down Studio': '关闭 Studio', 'Reload page': '重新加载页面',
	'Quick Switcher': '快速切换', 'Switch composition': '切换作品',
	'Left Sidebar': '左侧栏', 'Right Sidebar': '右侧栏', 'Timeline': '时间轴',
	'Rulers': '标尺', 'Show Rulers': '显示标尺', 'Guides': '参考线', 'Show Guides': '显示参考线',
	'Checkerboard': '棋盘格背景', 'Transparency as checkerboard': '用棋盘格显示透明区域',
	'Show Premounting': '显示预挂载', 'Layer Frame Counters': '图层帧计数器',
	'Show timeline ticks as frames': '时间轴刻度以帧显示', 'Toggle time format': '切换时间格式',
	'Fullscreen': '全屏', 'Go Fullscreen': '进入全屏', 'Zoom in': '放大', 'Zoom out': '缩小',
	'Zoom in timeline': '放大时间轴', 'Zoom out timeline': '缩小时间轴',
	'Preview Size': '预览尺寸', 'Color Picker': '取色器', 'Show Color Picker': '显示取色器',
	'Pick color from screen': '从屏幕取色', 'Enable Snapping': '启用吸附', 'Snapping': '吸附',
	'Pixel Grid': '像素网格', 'Outlines': '轮廓',
	// 作品与素材
	'Composition': '作品', 'Current composition': '当前作品', 'Composition ID': '作品 ID',
	'Composition browser': '作品浏览器', 'Composition Tabs': '作品标签页',
	'New composition': '新建作品', 'New composition...': '新建作品...', 'New composition settings': '新作品设置',
	'New composition in folder...': '在文件夹中新建作品...',
	'New folder': '新建文件夹', 'New folder...': '新建文件夹...', 'New folder in folder...': '在文件夹中新建文件夹...',
	'Rename composition...': '重命名作品...', 'Duplicate composition...': '复制作品...', 'Delete composition...': '删除作品...',
	'Rename folder...': '重命名文件夹...', 'Delete folder...': '删除文件夹...', 'Rename...': '重命名...', 'Delete...': '删除...',
	'Copy composition ID': '复制作品 ID', 'Copy composition file location': '复制作品文件位置',
	'Sort compositions alphabetically': '按字母排序作品', 'Sort compositions as registered': '按注册顺序排序作品',
	'Alphabetically': '按字母顺序', 'As registered': '按注册顺序', 'Sort': '排序',
	'Select a composition to get started.': '选择一个作品开始。',
	'Project assets': '项目素材', 'Upload assets...': '上传素材...', 'Upload...': '上传...',
	'Rename asset...': '重命名素材...', 'Delete asset': '删除素材', 'Delete asset...': '删除素材...',
	'Show asset': '显示素材', 'Open in Folder': '在文件夹中打开', 'Copy asset file name': '复制素材文件名',
	'Copy asset absolute path': '复制素材绝对路径', 'Copy staticFile() path': '复制 staticFile() 路径',
	'Open in editor...': '在编辑器中打开...', 'Open in...': '打开方式...', 'Open in new window': '在新窗口打开',
	// 渲染
	'Render': '渲染', 'Render...': '渲染...', 'Render via CLI': '通过命令行渲染',
	'Render in browser': '在浏览器中渲染', 'Render in browser...': '在浏览器中渲染...',
	'Server-side render': '服务端渲染', 'Client-side render': '浏览器端渲染',
	'Cancel render': '取消渲染', 'Remove render': '移除渲染任务', 'Reveal output': '打开输出位置',
	'Select render type': '选择渲染类型', 'Beep when render finishes': '渲染完成时提示音',
	'The render failed because of the following error:': '渲染失败，错误如下：',
	'Output': '输出', 'Format': '格式', 'Codec': '编码器', 'Audio Codec': '音频编码器', 'Default codec': '默认编码器',
	'Video': '视频', 'Audio': '音频', 'Still': '静帧', 'Image sequence': '图片序列', 'No audio': '无音频',
	'Quality': '质量', 'Video quality': '视频质量', 'Audio Quality': '音频质量', 'Video bitrate': '视频码率',
	'Target audio bitrate': '目标音频码率', 'Sample Rate': '采样率', 'Pixel format': '像素格式',
	'Color Space': '色彩空间', 'Image Format': '图像格式', 'Still image format': '静帧图像格式',
	'Frame range': '帧范围', 'Hardware Acceleration': '硬件加速', 'Log Level': '日志级别',
	'Encoding': '编码', 'Performance': '性能', 'General': '常规', 'Advanced': '高级',
	'Very Low': '极低', 'Low': '低', 'Medium': '中', 'High': '高', 'Very High': '极高',
	'Video output file': '视频输出文件', 'Saving to out/...': '正在保存到 out/...',
	// 属性与检查器
	'Props': '属性', 'Schema': '结构', 'JSON': 'JSON', 'Value': '值', 'Name': '名称', 'Type': '类型',
	'Width': '宽度', 'Height': '高度', 'Dimensions': '尺寸', 'Duration': '时长', 'Duration (frames)': '时长（帧）',
	'Duration in frames': '时长（帧数）', 'Frame rate': '帧率', 'Frame rate (fps)': '帧率（fps）', 'FPS': '帧率',
	'Frame': '帧', 'Frames': '帧', 'Timecode': '时间码', 'Size': '大小', 'Info': '信息', 'Metadata': '元数据',
	'Reset': '重置', 'Reset to default': '恢复默认', 'Set input props...': '设置输入属性...',
	'Override input props': '覆盖输入属性', 'Add item': '添加项目', 'Remove': '移除',
	'Add a schema prop to edit props.': '添加 schema 属性后即可编辑属性。',
	'Install zod to edit props.': '安装 zod 后即可编辑属性。',
	'Zod validation failure': 'Zod 校验失败', 'Zod Validation has failed:': 'Zod 校验失败：',
	'The data does not satisfy the schema:': '数据不符合结构定义：',
	'Effects': '效果', 'Effect': '效果', 'Add effect': '添加效果', 'Add effect...': '添加效果...',
	'Search effects...': '搜索效果...', 'No effects found': '未找到效果',
	'Search fonts': '搜索字体', 'No fonts found': '未找到字体', 'Loading font preview...': '正在加载字体预览...',
	'Keyframe settings': '关键帧设置', 'Next keyframe': '下一个关键帧', 'Previous keyframe': '上一个关键帧',
	'Spring': '弹簧', 'Bezier': '贝塞尔', 'Hold': '保持', 'Damping': '阻尼', 'Mass': '质量', 'Stiffness': '刚度',
	'Captions': '字幕', 'Import captions': '导入字幕', 'No captions': '无字幕', 'Transcription': '转写',
	// 播放控制
	'Playback': '播放', 'Playback Rate': '播放速度', 'Loop': '循环', 'Mute': '静音',
	'Go to beginning': '回到开头', 'Go to frame': '跳转到帧', 'Next frame': '下一帧', 'Previous frame': '上一帧',
	'In Mark': '入点', 'Out Mark': '出点', 'In point': '入点', 'Out point': '出点',
	'Clear In/Out Marks': '清除入点/出点', 'Clear In marker': '清除入点', 'Clear Out marker': '清除出点',
	'Timeline: Set In Mark': '时间轴：设置入点', 'Timeline: Set Out Mark': '时间轴：设置出点',
	'Timeline: Clear In and Out Mark': '时间轴：清除入点和出点', 'Timeline: Go to frame': '时间轴：跳转到帧',
	// 通用
	'Cancel': '取消', 'Cancelled': '已取消', 'Close': '关闭', 'Close Others': '关闭其他', 'Close dialog': '关闭对话框',
	'Copy': '复制', 'Copy path': '复制路径', 'Copy to clipboard': '复制到剪贴板', 'Copy command': '复制命令',
	'Delete': '删除', 'Duplicate': '复制副本', 'Done': '完成', 'Retry': '重试', 'Clear': '清除',
	'Undo': '撤销', 'Redo': '重做', 'Download': '下载', 'Install': '安装', 'Uninstall': '卸载',
	'Learn more': '了解更多', 'Learn how': '了解方法', 'View docs': '查看文档', 'Expand': '展开', 'Collapse': '折叠',
	'Enabled': '已启用', 'Disabled': '已禁用', 'None': '无', 'Custom': '自定义', 'Interface': '界面',
	'Editor': '编辑器', 'Default editor': '默认编辑器', 'Notifications': '通知', 'Terminal': '终端',
	'Loading preview...': '正在加载预览...', 'Checking for updates...': '正在检查更新...',
	'A new Remotion update is available.': 'Remotion 有新版本可用。',
	'Could not check for updates.': '无法检查更新。', 'Studio server disconnected': 'Studio 服务已断开',
	'Restarting the Studio server...': '正在重启 Studio 服务...',
	'Restart Studio to apply config file changes': '重启 Studio 以应用配置文件更改',
	'Fast refresh will not work.': '快速刷新将无法工作。', 'Waiting for registerRoot() to get called.': '正在等待 registerRoot() 被调用。',
};

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
const props = '(label|title|placeholder|tooltip|children|text|quickSwitcherLabel|description|header|buttonLabel|aria-label|ariaLabel)';
const patterns = keys.map((k) => ({
	k,
	quoted: new RegExp(`(${props}\\s*[:=]\\s*\\{?\\s*)(['"\`])${esc(k)}\\3`, 'g'),
	ternary: new RegExp(`(\\?\\s*)(['"])${esc(k)}\\2(\\s*:)`, 'g'),
	elseBranch: new RegExp(`(\\?\\s*(['"])[^'"\\n]*\\2\\s*:\\s*)(['"])${esc(k)}\\3`, 'g'),
	jsx: new RegExp(`(>\\s*)${esc(k)}(\\s*<)`, 'g'),
}));

export function translate(code) {
	let n = 0;
	for (const {k, quoted, ternary, elseBranch, jsx} of patterns) {
		const v = dict[k];
		code = code.replace(quoted, (_m, pre, _p, q) => (n++, `${pre}${q}${v}${q}`));
		code = code.replace(ternary, (_m, pre, q, post) => (n++, `${pre}${q}${v}${q}${post}`));
		code = code.replace(elseBranch, (_m, pre, _q, q) => (n++, `${pre}${q}${v}${q}`));
		code = code.replace(jsx, (_m, a, b) => (n++, `${a}${v}${b}`));
	}
	return {code, n};
}

const target = path.resolve(process.argv[2] ?? 'node_modules/@remotion/studio/dist');
const walk = (d) => fs.readdirSync(d, {withFileTypes: true}).flatMap((e) =>
	e.isDirectory() ? walk(path.join(d, e.name)) : /\.(m?js|tsx?)$/.test(e.name) && !e.name.endsWith('.d.ts') ? [path.join(d, e.name)] : []);
let total = 0, files = 0;
for (const f of walk(target)) {
	const src = fs.readFileSync(f, 'utf8');
	const {code, n} = translate(src);
	if (n && code !== src) { fs.writeFileSync(f, code); total += n; files++; }
}
console.log(`汉化完成：${files} 个文件，${total} 处文本 -> ${target}`);
