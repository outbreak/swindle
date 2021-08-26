"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const NodePath = __importStar(require("path"));
const core_1 = require("@swindle/core");
/**
 * Path
 *
 * A utility class for working with file and directory paths
 */
class Path {
    constructor(value) {
        if (!value) {
            throw new core_1.InvalidArgumentException("Invalid Path");
        }
        this._value = value.trim().replace(/\\|\//g, NodePath.sep);
    }
    /**
     * Delimiter()
     *
     * Provides the platform-specific path delimiter.
     * - Windows: ";"
     * -POSIX: ":"
     *
     * @returns the platform speciic path delimiter.
     */
    static Delimiter() {
        return NodePath.delimiter;
    }
    /**
     * FromSegments()
     *
     * Creates a Path from one or more segments.
     * @param segments the segnents of the path to create.
     * @returns the generated Path
     * @throws InvalidArgumentException when the segments are invalid.
     */
    static FromSegments(...segments) {
        if (segments.length !== 0) {
            const sanitizedSegments = segments.map(seg => seg instanceof Path ? seg.toString() : seg);
            return new Path(NodePath.resolve(...sanitizedSegments));
        }
        else {
            throw new core_1.InvalidArgumentException("Invalid Path segments.");
        }
    }
    /**
     * Separator()
     *
     * gets he platform-specific path segment separator.
     * - Windows: \
     * - POSIX: /
     * @returns
     */
    static Separator() {
        return NodePath.sep;
    }
    /**
     * basename()
     *
     * gets the last portion of the path.
     */
    basename() {
        return new Path(NodePath.basename(this.toString()));
    }
    /**
     * dirname()
     *
     * gets the directory name of the path.
     */
    dirname() {
        return new Path(NodePath.dirname(this.toString()));
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof Path) {
            const other = suspect;
            isEqual = this.toString() === other.toString();
        }
        return isEqual;
    }
    /**
     * extension()
     *
     * gets the extension of the path.
     */
    extension() {
        return NodePath.extname(this.toString());
    }
    /**
    * isAbsolute()
    *
    * determines if path is an absolute path
    */
    isAbsolute() {
        return NodePath.isAbsolute(this.toString());
    }
    /**
     * normalize()
     *
     * normalizes the given path, resolving '..' and '.' segments.
     */
    normalize() {
        return new Path(NodePath.normalize(this.toString()));
    }
    /**
     * toNamespacedPath()
     *
     * gets an equivalent namespace-prefixed path.
     *
     * This method is meaningful only on Windows systems. On POSIX systems,
     * the method is non-operational and always returns path without modifications.
     */
    toNamespacedPath() {
        return new Path(NodePath.toNamespacedPath(this.toString()));
    }
    toString() {
        return this._value;
    }
}
exports.Path = Path;
//# sourceMappingURL=path.js.map